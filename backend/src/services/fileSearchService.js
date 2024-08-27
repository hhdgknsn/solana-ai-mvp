// /src/services/fileSearchService.js
import { OpenAI } from 'openai';
import fs from 'fs/promises';
import path from 'path';

const client = new OpenAI(process.env.OPENAI_API_KEY);

export async function createVectorStore(name) {
  const vectorStore = await client.beta.vector_stores.create({ name });
  return vectorStore.id;
}

export async function uploadFilesToVectorStore(vectorStoreId, filePaths) {
  const fileStreams = filePaths.map((filePath) => fs.createReadStream(filePath));
  const fileBatch = await client.beta.vector_stores.file_batches.upload_and_poll({
    vector_store_id: vectorStoreId,
    files: fileStreams,
  });
  return fileBatch;
}

export async function updateAssistantWithVectorStore(assistantId, vectorStoreId) {
  await client.beta.assistants.update({
    assistant_id: assistantId,
    tool_resources: {
      file_search: {
        vector_store_ids: [vectorStoreId],
      },
    },
  });
}

export async function searchFiles(threadId, assistantId, query) {
  const thread = await client.beta.threads.create({
    messages: [{ role: 'user', content: query }],
    tool_resources: {
      file_search: { vector_store_ids: ['your-vector-store-id'] },
    },
  });

  const response = await client.beta.threads.runs.stream({
    thread_id: thread.id,
    assistant_id: assistantId,
    instructions: 'Search through files to provide a detailed response.',
  });

  return response;
}
