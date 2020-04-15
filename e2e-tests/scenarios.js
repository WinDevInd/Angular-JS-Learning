"use strict";

describe("PhoneCat Application", function () {
  describe("phoneList", function () {
    beforeEach(function () {
      browser.get("index.html");
    });
    it("should filter the phone list as a user types into the search box", function () {
      var phoneList = element.all(by.repeater("phone in $ctrl.phones"));
      var query = element(by.model("$ctrl.query"));
      var orderSelect = element(by.model("$ctrl.orderProp"));
      var nameOption = orderSelect.element(by.css('option[value="name"]'));

      var phoneNameColumn = element.all(
        by.repeater("phone in $ctrl.phones").column("phone.name")
      );

      function getNames() {
        return phoneNameColumn.map(function (elem) {
          return elem.getText();
        });
      }

      expect(phoneList.count()).toBe(3);

      query.sendKeys("Wi-fi");
      expect(phoneList.count()).toBe(1);
      expect(getNames()).toEqual(["Motorola XOOM™ with Wi-Fi"]);

      query.clear();
      expect(phoneList.count()).toBe(3);
      expect(getNames()).toEqual([
        "Nexus S",
        "Motorola XOOM™ with Wi-Fi",
        "MOTOROLA XOOM™",
      ]);

      // search for query motorola
      // sort by name "alphabatically"
      query.sendKeys("MOTOROLA");
      nameOption.click();
      expect(phoneList.count()).toBe(2);
      expect(getNames()).toEqual([
        "MOTOROLA XOOM™",
        "Motorola XOOM™ with Wi-Fi",
      ]);
    });
  });
});
