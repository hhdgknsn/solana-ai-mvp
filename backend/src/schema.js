export const defaultDesign = {
    accounts: [
      {
        name: "UserAccount",
        fields: [
          { name: "user_id", type: "PublicKey", required: true },
          { name: "username", type: "String", required: false },
          { name: "hashed_password", type: "u8[32]", required: true },
          { name: "balance", type: "u64", required: true },
          { name: "creation_timestamp", type: "u64", required: true },
          { name: "is_active", type: "bool", required: true },
          { name: "associated_programs", type: "PublicKey[]", required: false },
          { name: "email", type: "String", required: false },
          { name: "profile_picture", type: "String", required: false },
          { name: "permissions", type: "String[]", required: false },
          { name: "transaction_history", type: "String[]", required: false },
          { name: "account_settings", type: "String", required: false },
          { name: "metadata", type: "String", required: false }
        ]
      },
      {
        name: "ProgramAccount",
        fields: [
          { name: "program_id", type: "PublicKey", required: true },
          { name: "program_name", type: "String", required: true },
          { name: "program_code_hash", type: "u8[32]", required: true },
          { name: "owner", type: "PublicKey", required: true },
          { name: "is_active", type: "bool", required: true },
          { name: "deployment_timestamp", type: "u64", required: true },
          { name: "instruction_costs", type: "u64[]", required: false },
          { name: "version_info", type: "String", required: false },
          { name: "metadata", type: "String", required: false },
          { name: "state_info", type: "String", required: false },
          { name: "permissions", type: "String[]", required: false },
          { name: "upgrade_mechanism", type: "String", required: false }
        ]
      }
    ],
    relationships: [
      { type: "one-to-many", from: "UserAccount", to: "ProgramAccount", on: "user_id" }
    ],
    init_params: {
      UserAccount: [
        { name: "user_id", required: true },
        { name: "username", required: false },
        { name: "hashed_password", required: true },
        { name: "balance", required: true, default: 0 },
        { name: "creation_timestamp", required: true },
        { name: "is_active", required: true, default: true },
        { name: "associated_programs", required: false },
        { name: "email", required: false },
        { name: "profile_picture", required: false },
        { name: "permissions", required: false },
        { name: "transaction_history", required: false },
        { name: "account_settings", required: false },
        { name: "metadata", required: false }
      ],
      ProgramAccount: [
        { name: "program_id", required: true },
        { name: "program_name", required: true },
        { name: "program_code_hash", required: true },
        { name: "owner", required: true },
        { name: "is_active", required: true, default: true },
        { name: "deployment_timestamp", required: true },
        { name: "instruction_costs", required: false },
        { name: "version_info", required: false },
        { name: "metadata", required: false },
        { name: "state_info", required: false },
        { name: "permissions", required: false },
        { name: "upgrade_mechanism", required: false }
      ]
    },
    instructions: [
      { name: "CreateUser", parameters: [
        { name: "user_id", type: "PublicKey", required: true },
        { name: "username", type: "String", required: false },
        { name: "hashed_password", type: "u8[32]", required: true }
      ]},
      { name: "DeactivateUser", parameters: [
        { name: "user_id", type: "PublicKey", required: true }
      ]},
      { name: "CreateProgram", parameters: [
        { name: "program_id", type: "PublicKey", required: true },
        { name: "program_name", type: "String", required: true },
        { name: "program_code_hash", type: "u8[32]", required: true },
        { name: "owner", type: "PublicKey", required: true }
      ]},
      { name: "DeactivateProgram", parameters: [
        { name: "program_id", type: "PublicKey", required: true }
      ]},
      { name: "TransferFunds", parameters: [
        { name: "from_user_id", type: "PublicKey", required: true },
        { name: "to_user_id", type: "PublicKey", required: true },
        { name: "amount", type: "u64", required: true }
      ]}
    ],
    state_transitions: [
      { name: "CreateUser", from: "new", to: "active" },
      { name: "DeactivateUser", from: "active", to: "inactive" },
      { name: "CreateProgram", from: "new", to: "active" },
      { name: "DeactivateProgram", from: "active", to: "inactive" },
      { name: "TransferFunds", state_change: "balance update" }
    ],
    errors: [
      { code: 1001, message: "Invalid Parameters" },
      { code: 1002, message: "Account Not Found" },
      { code: 1003, message: "Insufficient Funds" },
      { code: 1004, message: "Account Inactive" }
    ],
    security: [
      { requirement: "Signature Verification", description: "All transactions must be signed by the account owner." },
      { requirement: "Authorization Checks", description: "Validate permissions before executing instructions." }
    ],
    integration_points: [
      { type: "Oracles", description: "Fetch real-time data for programs." },
      { type: "External Wallets", description: "Interact with user wallets for balance updates." },
      { type: "Cross-Program Invocations", description: "Invoke and interact with other deployed programs." }
    ],
    testing: [
      { scenario: "User Creation", description: "Validate correct initialization." },
      { scenario: "Fund Transfer", description: "Check balance updates." },
      { scenario: "Program Deployment", description: "Validate correct deployment and activation." },
      { scenario: "State Transitions", description: "Ensure state changes follow the defined transitions." },
      { scenario: "Error Handling", description: "Trigger and verify custom error codes." }
    ],
    performance_metrics: [
      { metric: "Gas Usage", description: "Measure gas usage for each instruction." },
      { metric: "Execution Time", description: "Ensure efficient execution time within acceptable limits." }
    ],
    development_environment: {
      tools: [
        { name: "Anchor", description: "Framework for smart contract development." },
        { name: "Rust", description: "Language for writing programs." },
        { name: "Solana CLI", description: "Tool for deployment and testing." }
      ],
      deployment_configuration: {
        network: "devnet",
        account_keys: "path/to/keypair.json",
        deployment_scripts: "path/to/deployment/scripts"
      }
    }
  };
  