DateTime.Field.Millisecond.Test = {};

DateTime.Field.Millisecond.Test.testSetValue = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis().value(1);

    assertEquals(1, millisecond.value());
};

DateTime.Field.Millisecond.Test.testGetMillis_Epoch = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis().millis(10120);

    assertEquals(120, millisecond.millis());
};

DateTime.Field.Millisecond.Test.testSetMillis_0ms_Start = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis().millis(0);

    assertEquals(0, millisecond.value());
};

DateTime.Field.Millisecond.Test.testSetMillis_0ms_Before = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis().millis(-1);

    assertEquals(999, millisecond.value());
};

DateTime.Field.Millisecond.Test.testSetMillis_negative = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis().millis(-62130512882031);

    assertEquals(969, millisecond.value());
};

DateTime.Field.Millisecond.Test.testMaxMillis_Value_OK = function() {
    var millisecond = DateTime.Field.Millisecond.Test.createMillis().value(DateTime.Field.Millisecond.MAX_MILLIS);

    assertEquals(DateTime.Field.Millisecond.MAX_MILLIS, millisecond.value());
};

DateTime.Field.Millisecond.Test.testMaxMillis_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Millisecond.Test.createMillis().value(DateTime.Field.Millisecond.MAX_MILLIS + 1);
    });
};

DateTime.Field.Millisecond.Test.testMinMillis_Value_OK = function() {
    DateTime.Field.Millisecond.Test.createMillis(DateTime.Field.Millisecond.MIN_MILLIS);
};

DateTime.Field.Millisecond.Test.testMinMillis_Value_Fail = function() {
    assertFail(function() {
        DateTime.Field.Millisecond.Test.createMillis().value(DateTime.Field.Millisecond.MIN_MILLIS - 1);
    });
};

DateTime.Field.Millisecond.Test.testValidate_text = function() {
    assertFail(function() {
        DateTime.Field.Millisecond.validate("a");
    });
};

DateTime.Field.Millisecond.Test.testValidate_long = function() {
    assertFail(function() {
        DateTime.Field.Millisecond.validate("11231237012730198239812398");
    });
};

DateTime.Field.Millisecond.Test.testValidate_hex = function() {
    assertFail(function() {
        DateTime.Field.Millisecond.validate("0x1");
    });
};

DateTime.Field.Millisecond.Test.testValidate_zeroTrail = function() {
    assertEquals(112, DateTime.Field.Millisecond.validate("0112"));
};

DateTime.Field.Millisecond.Test.testValidate_negative = function() {
    assertFail(function() {
        DateTime.Field.Millisecond.validate("-1");
    });
};

DateTime.Field.Millisecond.Test.createMillis = function(millis) {
    millis = DateTime.exists(millis, 0);

    return new DateTime.Field.Millisecond(mock({time: millis}));
};
