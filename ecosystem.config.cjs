module.exports = {
  apps: [
    {
      name: 'flixora',
      script: 'npx',
      // Serve the static build from dist/ — extremely low memory footprint.
      // --single makes the server fall back to index.html for unknown routes (SPA-style)
      // but we still serve real HTML pages from disk first.
      args: 'serve dist -l tcp://0.0.0.0:3000 --no-clipboard',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      kill_timeout: 5000,
    },
  ],
};
