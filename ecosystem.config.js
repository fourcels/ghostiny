var production =  {
  user : "node",
  host : "23.106.132.243",
  ref  : "origin/master",
  repo : "https://github.com/fourcels/ghostiny.git",
  path : "~/ghostiny"
}

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "API",
      script    : "app.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },

    // Second application
    {
      name      : "WEB",
      script    : "web.js"
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    "prod" : production,
    "prod-reload" : {
      ...production,
      "post-deploy" : "pm2 reload ghost"
    }
  }
}
