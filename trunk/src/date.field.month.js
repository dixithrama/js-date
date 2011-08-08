Date.Field.Month = function(month, year) {
    var MILLS_BY_NORMAL_MONTHS = [0, 2678400000, 5097600000, 7776000000, 10368000000, 13046400000, 15638400000, 18316800000, 20995200000, 23587200000, 26265600000, 28857600000, 31536000000];
    var MILLS_BY_LEAP_MONTHS =   [0, 2678400000, 5184000000, 7862400000, 10454400000, 13132800000, 15724800000, 18403200000, 21081600000, 23673600000, 26352000000, 28944000000, 31622400000];

    var self = this;

    this.duration = function() {
        return self._year.isLeap() ?
                MILLS_BY_LEAP_MONTHS[self._val + 1] - MILLS_BY_LEAP_MONTHS[self._val] :
                MILLS_BY_NORMAL_MONTHS[self._val + 1] - MILLS_BY_NORMAL_MONTHS[self._val];
    };

    this.mills = function(value, year) {
        if (arguments.length === 0) {
            return (self._year.isLeap() ? MILLS_BY_LEAP_MONTHS[self._val] : MILLS_BY_NORMAL_MONTHS[self._val]);
        }

        value = Date.Field.validateInt(value);

        if (arguments.length === 1) {
            self._year.mills(value);
        } else {
            self._year.value(year);
        }

        // Copied from JodaTime.

        var i = (value - self._year.mills()) / 1024;

        // There are 86400000 milliseconds per day, but divided by 1024 is
        // 84375. There are 84375 (128/125)seconds per day.

        var month =
            (self._year.isLeap())
            ? ((i < 182 * 84375)
               ? ((i < 91 * 84375)
                  ? ((i < 31 * 84375) ? 1 : (i < 60 * 84375) ? 2 : 3)
                  : ((i < 121 * 84375) ? 4 : (i < 152 * 84375) ? 5 : 6))
               : ((i < 274 * 84375)
                  ? ((i < 213 * 84375) ? 7 : (i < 244 * 84375) ? 8 : 9)
                  : ((i < 305 * 84375) ? 10 : (i < 335 * 84375) ? 11 : 12)))
            : ((i < 181 * 84375)
               ? ((i < 90 * 84375)
                  ? ((i < 31 * 84375) ? 1 : (i < 59 * 84375) ? 2 : 3)
                  : ((i < 120 * 84375) ? 4 : (i < 151 * 84375) ? 5 : 6))
               : ((i < 273 * 84375)
                  ? ((i < 212 * 84375) ? 7 : (i < 243 * 84375) ? 8 : 9)
                  : ((i < 304 * 84375) ? 10 : (i < 334 * 84375) ? 11 : 12)));

        self._val = month - 1;

        return self;
    };

    this.value = function(month, year) {
        if (arguments.length === 0) {
            return self._val + 1;
        }

        if (arguments.length === 2) {
            self._year.value(year);
        }

        self._val = Date.Field.Month.validate(month) - 1;

        return self;
    };

    switch (arguments.length) {
        case 0:
            this._year = new Date.Field.Year();
            this.mills(new Date().getTime(), this._year.value());
            break;
        case 1:
            this._year = new Date.Field.Year();
            this.value(month, this._year.value());
            break;
        case 2:
            this._year = new Date.Field.Year(year);
            this.value(month, this._year.value());
            break;
    }
};

/** Constant (1) representing January, the first month (ISO) */
Date.Field.Month.JANUARY = 1;
/** Constant (2) representing February, the second month (ISO) */
Date.Field.Month.FEBRUARY = 2;
/** Constant (3) representing March, the third month (ISO) */
Date.Field.Month.MARCH = 3;
/** Constant (4) representing April, the fourth month (ISO) */
Date.Field.Month.APRIL = 4;
/** Constant (5) representing May, the fifth month (ISO) */
Date.Field.Month.MAY = 5;
/** Constant (6) representing June, the sixth month (ISO) */
Date.Field.Month.JUNE = 6;
/** Constant (7) representing July, the seventh month (ISO) */
Date.Field.Month.JULY = 7;
/** Constant (8) representing August, the eighth month (ISO) */
Date.Field.Month.AUGUST = 8;
/** Constant (9) representing September, the nineth month (ISO) */
Date.Field.Month.SEPTEMBER = 9;
/** Constant (10) representing October, the tenth month (ISO) */
Date.Field.Month.OCTOBER = 10;
/** Constant (11) representing November, the eleventh month (ISO) */
Date.Field.Month.NOVEMBER = 11;
/** Constant (12) representing December, the twelfth month (ISO) */
Date.Field.Month.DECEMBER = 12;

Date.Field.Month.MIN_MONTH = Date.Field.Month.JANUARY;
Date.Field.Month.MAX_MONTH = Date.Field.Month.DECEMBER;

Date.Field.Month.validate = function(month) {
    month = Date.Field.validateInt(month);

    Date.Field.assertTrue(month >= Date.Field.Month.MIN_MONTH && month <= Date.Field.Month.MAX_MONTH,
            "Month is expected to be in range [" + Date.Field.Month.MIN_MONTH + ".." + Date.Field.Month.MAX_MONTH + "] but was: " + month);

    return month;
};