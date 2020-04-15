describe("phoneList", function () {
  beforeEach(module("phoneListModule"));

  // Test the controller
  describe("controller", function () {
    var $httpBackend, ctrl;
    beforeEach(inject(function ($componentController, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend
        .expectGET("phones/phones.json")
        .respond([{ name: "Nexus S" }, { name: "Motorola DROID" }]);

      ctrl = $componentController("phoneList");
    }));
    it("should create a `phones` property with 2 phones fetched with `$http`", function () {
      expect(ctrl.phones).toBeUndefined();

      // this method need to be called so httpBackend.expectGET method can respond
      $httpBackend.flush();

      expect(ctrl.phones.length).toBe(2);
      expect(ctrl.phones).toEqual([
        { name: "Nexus S" },
        { name: "Motorola DROID" },
      ]);
    });

    it("should set a default 'orderProp' to age", function () {
      expect(ctrl.orderProp).toBe("age");
    });
  });
});
