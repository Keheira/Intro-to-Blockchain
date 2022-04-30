let Donations = artifacts.require("Donations")
let BN = web3.utils.BN

contract("Donations", function(accounts) {
    const [_owner, user1, user2] = accounts

    const testAmount = "1000"

    let instance

    beforeEach(async() => {
        instance = await Donations.new()
    })

    describe("Variables", () => {
        it("should have an owner", async () => {
          assert.equal(typeof instance.owner, 'function', "the contract has no owner");
        })

        it("should have a donation total", async () => {
            assert.equal(typeof instance.donationTotal, 'function', "the contract has no donation total");
        })

        it("should have a top donor", async () => {
            assert.equal(typeof instance.topDonor, 'function', "the contract has no top donor");
        })
    })

    describe("addDonation()", () => {

        it("should be able to add donation with empty message", async() => {
            await instance.addDonation("", testAmount, {from: user1})
            const result = await instance.getDonation.call(0)

            assert.equal(
                result[0],
                user1,
                "donation address doesn't match"
            )

            assert.equal(
                result[1],
                "",
                "donation message should be empty"
            )

            assert.equal(
                result[2],
                testAmount,
                "donation amount doesn't match"
            )
        })

        it("should be able to add donation with a message", async() => {
            await instance.addDonation("donation 1", testAmount, {from: user1})
            const result = await instance.getDonation.call(0)

            assert.equal(
                result[0],
                user1,
                "donation address doesn't match"
            )

            assert.equal(
                result[1],
                "donation 1",
                "donation message doesn't match"
            )

            assert.equal(
                result[2],
                testAmount,
                "donation amount doesn't match"
            )
        })
    })

    // TODO: allow only contract owner to pull donations
    /*describe("pullDonations()", () => {
        it("should increment donation array length", async() => {
            await instance.pullDonations("donation 1", {from: user1})
            const result = await getDonations()

            assert(
                1,
                result,
                "the number of donations is incorrect"
            )
        })
    })*/

    describe("getAllDonations()", () => {
        it("should have 3 donations", async() => {
            await instance.addDonation("donation 1", testAmount, {from: user1})
            await instance.addDonation("donation 2", testAmount, {from: user2})
            await instance.addDonation("donation 3", testAmount, {from: user1})
            const result = await instance.getAllDonations()

            assert(
                result.length,
                3,
                "the number of donations is incorrect"
            )
        })
    })

    describe("getTotalDonations()", () => {
        it("get amount of all donations", async() => {
            await instance.addDonation("donation 1",testAmount, {from: user1})
            const result = await instance.getTotalDonations()

            assert(
                result,
                testAmount,
                "the number of donations is incorrect"
            )
        })
    })

    describe("getTopDonation()", () => {
        it("should get the top donation amount", async() => {
            await instance.addDonation("donation 1", testAmount, {from: user1})
            const result = await instance.getTopDonation()

            assert(
                result.amount,
                testAmount,
                "the number of donations is incorrect"
            )
        })
    })
})