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

    // Корректное получение всех ивентов из выражения вида: E1.E2.....En
    function getEvents(event) {
        let lastIndexOfDot = event.lastIndexOf('.');
        if (lastIndexOfDot === - 1) {
            return [event];
        }
        let results = [event];
        let currentEvent = event;
        while (lastIndexOfDot > -1) {
            currentEvent = currentEvent.slice(0, lastIndexOfDot);
            results.push(currentEvent);
            lastIndexOfDot = currentEvent.lastIndexOf('.');
        }

        return results;
    }

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            let student = { name: context, operationForName: handler };
            if (!eventsForStudents.has(event)) {
                let arrayOfStudents = [student];
                eventsForStudents.set(event, arrayOfStudents);
            } else {
                eventsForStudents.get(event).push(student);
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
            let unsubedEvents = Array.from(eventsForStudents.keys()).filter(currentEvent =>
                currentEvent.startsWith(event + '.') || currentEvent === event);

            for (let currentEvent of unsubedEvents) {
                let subscribedStudents = eventsForStudents.get(currentEvent).filter(student =>
                    student.name !== context);
                eventsForStudents.set(currentEvent, subscribedStudents);
            }

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            let allEvents = getEvents(event);
            for (let command of allEvents) {
                if (eventsForStudents.has(command)) {
                    eventsForStudents.get(command).map(student =>
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
