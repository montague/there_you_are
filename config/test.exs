use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :there_you_are, ThereYouAre.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :there_you_are, ThereYouAre.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "there_you_are_test",
  pool: Ecto.Adapters.SQL.Sandbox
