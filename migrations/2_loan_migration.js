const Loans = artifacts.require("Loans")

// TODO: Needs some beefy stuff
module.exprts = function(deployer) {
    deployer.deploy(Loans)
}