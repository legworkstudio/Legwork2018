import request from 'request';
const streams = require('memory-streams');

const writer = new streams.WritableStream();

/*
------------------------------------------
| init:void (-)
|
| Method Notes
------------------------------------------ */
export function init(){
  if( writer.toString() == '' || process.env.NODE_ENV == 'development'){
    return new Promise( (resolve, reject) => { 
      request({
        url: 'http://assets.legwork.studio/data/project.json',
        json: true
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          writer.write(JSON.stringify(body));
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  } else {
    return new Promise( (resolve) => {
      const cache = JSON.parse(writer.toString());
      resolve(cache);
    });
  }
}
