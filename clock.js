window.addEventListener('load', function load() {
    window.removeEventListener('load', load, false);

    var canvas  = document.createElement('canvas'),
        ctx     = canvas.getContext('2d'),
        months  = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        radius, date, day, leap;

    document.body.appendChild(canvas);
    window.addEventListener('resize', resize);
    resize();

    (function drawFrame() {
        requestAnimationFrame(drawFrame);
        date = new Date();
        leap = isLeapYear(date.getYear());
        drawFace();
        drawNumerals();
        drawTime();
    })();

    function resize() {
        radius = getCircleRadius(20);
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        ctx.translate(canvas.width / 2, canvas.height / 2);
    }

    function getCircleRadius(padding) {
        if (window.innerWidth < window.innerHeight) {
            return Math.round((window.innerWidth / 2) - padding);
        } else {
            return Math.round((window.innerHeight / 2) - padding);
        }
    }

    function drawFace() {
        let angle,
            gradient = ctx.createRadialGradient(0, 0, radius * .1, 0, 0, radius * .4);
        // Clear canvas
        ctx.fillStyle = '#fff';
        ctx.fillRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);
        // Rings
        ctx.strokeStyle = '#333';
        ctx.fillStyle   = '#333';
        ctx.lineWidth   = radius * .005;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius * .75, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius * .5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius * .25, 0, 2 * Math.PI);
        ctx.stroke();
        // Dots and Indicies
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.font         = radius * 0.04 + 'px arial';
        let dayCounter = 1,
            monCounter = 0;
        if (leap) daysPerMonth[1] = 29;
        // Dots and Indices for days
        for (let i = 0; i < (leap ? 366 : 365); i++) {
            angle = (i + (leap ? 274.5 : 273.75)) * Math.PI / (leap ? 183 : 182.5);
            // Dots for Days
            ctx.beginPath();
            ctx.rotate(angle);
            ctx.arc(radius * .98, 0, radius * .003, 0, 2 * Math.PI);
            ctx.fill();
            ctx.rotate(-angle);
            // Indices for Months
            if (dayCounter == 1) {
                ctx.beginPath();
                ctx.rotate(angle);
                ctx.moveTo(radius * .90, 0);
                ctx.lineTo(radius * .96, 0);
                ctx.stroke();
                ctx.rotate(-angle);
            } else if (dayCounter % 5 == 0) {
                ctx.beginPath();
                ctx.rotate(angle);
                ctx.moveTo(radius * (dayCounter % 10 ? .94 : .93), 0);
                ctx.lineTo(radius * .96, 0);
                ctx.stroke();
                ctx.rotate(-angle);
            }
            if (dayCounter == daysPerMonth[monCounter]) {
                dayCounter = 0;
                monCounter++;
            }
            dayCounter++;
        }
        // Indices for hours
        for (let i = 0; i < 48; i++) {
            angle = i * Math.PI / 24;
            ctx.beginPath();
            ctx.rotate(angle);
            ctx.moveTo(radius * (i % 2 == 0 ? .65 : .68), 0);
            ctx.lineTo(radius * .71, 0);
            ctx.stroke();
            ctx.rotate(-angle);
        }
        // Dots for hours
        for (let j = 0; j < 144; j++) {
            angle = j * Math.PI / 72;
            ctx.beginPath();
            ctx.rotate(angle);
            ctx.arc(radius * .73, 0, radius * .003, 0, 2 * Math.PI);
            ctx.fill();;
            ctx.rotate(-angle);
        }
        // Indices for minutes
        for (let i = 0; i < 12; i++) {
            angle = i * Math.PI / 6;
            ctx.beginPath();
            ctx.rotate(angle);
            ctx.moveTo(radius * (i % 2 == 0 ? .43 : .4), 0);
            ctx.lineTo(radius * .46, 0);
            ctx.stroke();
            ctx.rotate(-angle);
        }
        // Dots for minutes
        for (let j = 0; j < 60; j++) {
            angle = j * Math.PI / 30;
            ctx.beginPath();
            ctx.rotate(angle);
            ctx.arc(radius * .48, 0, radius * .003, 0, 2 * Math.PI);
            ctx.fill();;
            ctx.rotate(-angle);
        }
        // Indices for seconds
        for (let i = 0; i < 12; i++) {
            angle = i * Math.PI / 6;
            ctx.beginPath();
            ctx.rotate(angle);
            ctx.moveTo(radius * (i % 3 == 0 ? .12 : .18), 0);
            ctx.lineTo(radius * .21, 0);
            ctx.stroke();
            ctx.rotate(-angle);
        }
        // Dots for seconds
        for (let j = 0; j < 60; j++) {
            angle = j * Math.PI / 30;
            ctx.beginPath();
            ctx.rotate(angle);
            ctx.arc(radius * .23, 0, radius * .003, 0, 2 * Math.PI);
            ctx.fill();;
            ctx.rotate(-angle);
        }
    }

    function drawNumerals() {
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.font         = radius * 0.04 + 'px arial';
        // 12 months
        for (let i = 0; i < 12; i++) {
            angle = i * Math.PI / 6;
            ctx.beginPath();
            ctx.rotate(angle);
            ctx.translate(0, -radius * 0.84);
            // ctx.rotate(-angle);
            ctx.fillText(months[i], 0, 0);
            // ctx.rotate(angle);
            ctx.translate(0, radius * 0.84);
            ctx.rotate(-angle);
        }
        // 24 hours
        for (let i = 1; i < 25; i++) {
            angle = i * Math.PI / 12;
            ctx.beginPath();
            ctx.rotate(angle);
            ctx.translate(0, -radius * 0.61);
            ctx.rotate(-angle);
            ctx.fillText(i, 0, 0);
            ctx.rotate(angle);
            ctx.translate(0, radius * 0.61);
            ctx.rotate(-angle);
        }
        // 60 minutes
        for (let i = 1; i < 7; i++) {
            angle = i * Math.PI / 3;
            ctx.beginPath();
            ctx.rotate(angle);
            ctx.translate(0, -radius * 0.36);
            ctx.rotate(-angle);
            ctx.fillText(i * 10, 0, 0);
            ctx.rotate(angle);
            ctx.translate(0, radius * 0.36);
            ctx.rotate(-angle);
        }
     }

    function drawTime() {
        let hour     = date.getHours(),
            minute   = date.getMinutes(),
            second   = date.getSeconds(),
            millisec = date.getMilliseconds();
        ctx.strokeStyle = '#0073b5';
        // Draw date hand
        let days = date.getDate() - 1,
            today;
        for (let i = 0; i < date.getMonth(); i++) {
            days += daysPerMonth[i];
        }
        days += hour / 24;
        today = (days * Math.PI / (leap ? 183 : 182.5));
        drawHand(today, -radius * .75, -radius * .98);
        // Draw hour hand
        hour = (hour * Math.PI / 12) +
               (minute * Math.PI / (12 * 60)) +
               (second * Math.PI / (720 * 60));
        drawHand(hour, -radius * .5, -radius * .73);
        // Draw minute hand
        minute = (minute * Math.PI / 30) +
                 (second * Math.PI / (30 * 60)) +
                 (millisec * Math.PI / (30 * 60000));
        drawHand(minute, -radius * .25, -radius * .48);
        // Draw second hand
        second = (second * Math.PI / 30) + (millisec * Math.PI / (30 * 1000));
        drawHand(second, radius * .03, -radius * .23);
        // Draw crescent moon
        ctx.fillStyle = '#0073b5';
        ctx.beginPath();
        ctx.rotate(second);
        ctx.arc(0, radius * .04, radius * .012, 0, 2 * Math.PI);
        ctx.fill();
        ctx.rotate(-second);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.rotate(second);
        ctx.arc(0, radius * .045, radius * .009, 0, 2 * Math.PI);
        ctx.fill();
        ctx.rotate(-second);
    }

    function drawHand(pos, moveTo, length) {
        ctx.beginPath();
        ctx.rotate(pos);
        ctx.moveTo(0, moveTo);
        ctx.lineTo(0, length);
        ctx.stroke();
        ctx.rotate(-pos);
    }

    function isLeapYear(year) {
        return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? true : false;
    }

}, true);
