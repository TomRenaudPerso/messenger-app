module.exports = {
   "presets": [
     "@babel/preset-env",
     "@babel/preset-react"
   ],
   "plugins": [
     "@babel/plugin-proposal-class-properties",
     "@babel/plugin-proposal-nullish-coalescing-operator",
     "@babel/plugin-proposal-optional-chaining",
     [
       "@babel/plugin-transform-runtime",
       {
         "corejs": false,
         "helpers": true,
         "regenerator": true,
         "useESModules": false
       }
     ]
   ]
};
