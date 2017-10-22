const dateFns = require('date-fns');
const sampleData = require('./sample-data.json');

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 8080, host: 'localhost' });

const getDataForInterval = (start, end) => {
  const data = [];

  const startDate = new Date(Number(start));
  const endDate = new Date(Number(end));
  const startOfHour = dateFns.startOfHour(startDate);

  const offset = dateFns.differenceInSeconds(startDate, startOfHour);
  const total = dateFns.differenceInSeconds(endDate, startDate);

  let i = offset, l = total + offset, timestamp = startDate;
  for(i; i < l; i++) {
    timestamp = dateFns.addSeconds(timestamp, 1);
    data.push(
      Object.assign({},
        sampleData[i],
        { timestamp: dateFns.format(timestamp, 'x') }
      )
    )
  }

  return data;
}

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      const {
        start,
        end
      } = request.query;

      let data = getDataForInterval(start, end);
      reply(data);
    }
});

server.register({
	register: require('hapi-cors'),
	options: {
		origins: ['*']
	}
}, function(err){
	server.start(function(){
		console.log(server.info.uri);
	});
});
