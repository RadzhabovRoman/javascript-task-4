'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let eventsForStudents = new Map();

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            console.info(event, context, handler);
            let student = { name: context, operationForName: handler };
            if (!eventsForStudents.has(event)) {
                let arrayOfStudents = [student];
                eventsForStudents.set(event, arrayOfStudents);
            } else {
                let arrrayOfStudents = eventsForStudents.get(event);
                arrrayOfStudents.push(student);
                eventsForStudents.set(event, arrrayOfStudents);
            }

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            console.info(event, context);
            let mapIter = eventsForStudents.keys();
            let unsabedEvents = []; // добавляется ивент, которого может не быть !!! - fixed!
            let next = mapIter.next();
            while (!next.done) {
                let currentEvent = next.value;
                next = mapIter.next();
                // console.info(currentEvent, event);
                if (currentEvent.startsWith(event + '.') || currentEvent === event) {
                    unsabedEvents.push(currentEvent);
                }
            }
            // console.info(unsabedEvents);
            for (let currentEvent of unsabedEvents) {
                let resultArray = eventsForStudents.get(currentEvent).filter(student =>
                    student.name !== context);
                eventsForStudents.set(currentEvent, resultArray);
            } // КХММММ

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            console.info(eventsForStudents);
            // slide.funny, затем slide
            let commandArray = event.split('.');
            if (commandArray.length > 1) {
                let temp = commandArray[0];
                commandArray[0] += ('.' + commandArray[1]);
                commandArray[1] = temp;
            }
            // commandArray.map(value => ) КХММММММММММММММММММММММММ
            console.info(commandArray);
            for (let coommand of commandArray) {
                if (eventsForStudents.has(coommand)) { // ЕШ
                    // console.info(coommand);
                    // console.info(eventsForStudents.get(coommand));
                    eventsForStudents.get(coommand).map(student =>
                        student.operationForName.call(student.name));
                }
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
