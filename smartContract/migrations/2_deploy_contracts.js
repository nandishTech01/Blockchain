const SimpleStorage = artifacts.require("SimpleStorage");
const CarbonCredit =artifacts.require("CarbonCredit");


module.exports = function (deployer) {
  deployer.deploy(CarbonCredit);
};
