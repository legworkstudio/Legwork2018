# config valid only for current version of Capistrano
lock "3.10.0"

set :application, 'legwork2018'
set :repo_url, 'git@github.com:legworkstudio/Legwork2018.git'
set :user, "root"

# Default deploy_to directory is /var/www/my_app
set :deploy_to, "/var/www/#{fetch(:application)}"

# Default value for :scm is :git
set :scm, :git

# Default value for :format is :pretty
set :format, :pretty

# Default value for :log_level is :debug
set :log_level, :debug

# Default value for :pty is false
set :pty, true

# Set Sudo
set :use_sudo, false

set :linked_dirs, %w{node_modules}

#--------------------------------------------------------------
#
#   On Deploy run NPM, Bower and Gulp.
#
#--------------------------------------------------------------
namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 1 do
      set :shared_path, "/var/www/#{fetch(:application)}/shared"
      set :current_path, "/var/www/#{fetch(:application)}/current"

      execute "cd /var/www/#{fetch(:application)}/current && npm install && npm install --only=dev && npm run build"

      execute "forever stopall"
      execute "cd /var/www/#{fetch(:application)}/current && forever start server.js"
      execute "sudo service nginx restart"

    end
  end

  after :publishing, :restart
end
