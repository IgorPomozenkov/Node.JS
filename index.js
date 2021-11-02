const colors = require("colors");
const EventEmitter = require('events');

const emitter = new EventEmitter();
const [arg1, arg2] = process.argv.slice(2);

const argNow = arg1.replace(/(\d{1,2})-(\d{1,2})-(\d{1,2})-(\d{1,2})-(\d{4})/, '$5-$4-$3 $1:$2');
const deadline = new Date(argNow);

function getTimeRemaining(endtime) {
    const time = endtime - new Date();
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12));

    return {
        'total': time,
        'years': years,
        'months': months,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}

function format(n) {
    return n < 10 ? '0' + n : n;
}

function initializeClock(endtime) {
    if(!endtime.getTime()) {
        emitter.emit('error', 'Введите корректное время и дату! (hh-mm-dd-mm-yyyy)');
        return
    }

    function updateClock() {
        const timer = getTimeRemaining(endtime);

        if (timer.total <= 0) {
            clearInterval(timeinterval);
            emitter.emit('finish', 'Таймер завершил работу!');
            return
        }
        
        emitter.emit('send', timer);
    }

    let timeinterval;
    updateClock();
    timeinterval = setInterval(updateClock, 1000);
}

class Handlers {
    static send(payload) {
        const { years, months, days, hours, minutes, seconds } = payload;
        console.clear();
        console.log(`years: ${years},  months: ${months}, days: ${days}, hours: ${format(hours)}, minutes: ${minutes}, seconds: ${colors.brightBlue(seconds)}`);
    }
    static finish(payload) {
        console.log(colors.green(payload));
    }
    static error(payload) {
        console.log(payload.red);
    }
}

emitter.on('send', Handlers.send);
emitter.on('finish', Handlers.finish);
emitter.on('error', Handlers.error);

initializeClock(deadline);