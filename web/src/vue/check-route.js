import http from '../utils/http';
import cookie from 'cookies-js';

export default async function(to, from, next) {
    if (to.matched.some(record => record.meta.requiresAuth) && to.path !== '/') {
        const authed = await http({
            url: 'checkToken',
            data: {
                token: cookie.get('$_TOKEN') || ''
            }
        })
        try {
            let condition;
            switch (to.matched[0].meta.requiresAuth) {
                case 1:
                    condition = authed.data.ok
                    break
                case -1:
                    condition = !authed.data.ok
                    break
            }

            if (condition) {
                next()
            } else {
                next({
                    path: '/'
                })
            }
        } catch (e) {
            return false;
        }
    } else {
        next()
    }
}
