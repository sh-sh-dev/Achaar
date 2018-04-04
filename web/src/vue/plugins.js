import toFa from '../utils/number-to-fa';
import toEn from '../utils/number-to-en';

export default {
    install(V){
        V.prototype.$fa = toFa;
        V.prototype.$en = toEn;
    }
}
