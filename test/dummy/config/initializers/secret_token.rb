# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.



# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
Dummy::Application.config.secret_key_base = '43fa5672451bbd0a171668e625edc433eb00eeeb14c2606546e262e499ab853cfb532998d4809abe5019bf13888863e3a2c7d5cf7757de7a2b1fb50826d9874e'

#for rails 3.1 & 3.2
Dummy::Application.config.secret_token = Dummy::Application.config.secret_key_base
