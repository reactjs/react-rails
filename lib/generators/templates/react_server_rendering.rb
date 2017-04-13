# To render React components in production, precompile the server rendering manifest:
Rails.application.config.assets.precompile += ["server_rendering.js"]
