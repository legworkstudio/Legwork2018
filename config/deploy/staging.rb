
# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary server in each group
# is considered to be the first unless any hosts have the primary
# property set.  Don't declare `role :all`, it's a meta role.

role :app, %w{root@45.55.137.213}
role :web, %w{root@45.55.137.213}
role :db,  %w{root@45.55.137.213}

set :branch, "staging"


# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server definition into the
# server list. The second argument is a, or duck-types, Hash and is
# used to set extended properties on the server.

server '45.55.137.213', user: 'root', roles: %w{web app}