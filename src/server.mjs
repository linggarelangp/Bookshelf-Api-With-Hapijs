import Hapi from '@hapi/hapi'
import routes from '../routes/routes.mjs'

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    })

    server.route(routes)
    await server.start()
    console.log(`server running at ${server.info.uri}`)
}

init()
