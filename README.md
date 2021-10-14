## Initial Idea
Micro-loans
1. users register themselves
2. users can see any open micro loans
3. users "apply" for funds
4. agreement is made
5. transaction happens

## Loan Object
- username
- description
- amount
- isFunded
- loanerAddy

## Problem
- how do I assure the loaner gets their money back no matter for the particular ask?
- how do I associate the wallets? (people can delete or pay from another wallet)
- Where/how to host final demo?

## Projects for funding
| description | amount (ETH) | Return period |
| I want to pay a desgner to get my physical product completed. This project will be a workout loag for people trying to be runners. After research I have found that runners that don't wear smart devices don't have a good way to track progress. Even if they are tracking things they aren't doing it in relation to a competitive scale. | 0.00000001 | 3 months |
| I'm trying to have my first CD produced. Some of the songs I've made in the past can be found on [soundcloud](). The success of the project will solidify my contract with ABC Records. | 0.00000002 | 1 year |
| I want to pay for marketing  and a few freelance salaries for my agency. I'm a one person team building out a software development agency. We handle everything from design to production when working with clients. I'd use the money for 6 months of marketing and to hire 2 developers and a designer full time. We are just getting started, but with this inial loan we could have a significant boost ot move faster.| 0.00000003 | 9 months |
| To be honest I'm just impatient. I just want to blow this money on immediate wants while they are still available. | 0.00000004 | 5 months |
| I have the next big thing in social media. I have done no research, but I just know it will take off. It's twitter for NFT holders. Very exclusive and I'll make it dao like so people have some extra skiin in the game. I'll use the entire loan to pay the developer. I don't make money until you make your money back. | 0.00000005 | 1 month |


## Sprint 0 - Loan contract workflow
Create loan contract with a way to fund a project and see what projects are funded. There should be a test for every method.

## Sprint 1 - UI
I should be able to see a simple screen with cards that have 1/5 scenarios from above in a 3x3 grid pattern. I'll be using the pet shop as a base and modifying it as needed. There will be 3 button states: funded, funded by me, and available. On available button press I should be able to see a pop up stating "This has been funded" and a change to the button text to say "Funded by me". This success should trigger a countdown timer on the card so user knows how long the project has to pay back. The timer should be in days.

There should be another account that visits the site and can see the button text as "Funded"

## Sprint 2 - UI usability
I should be able to fund a project (0.00000001 to 0.00000005 ETH) and see visually that it has been funded.

## Sprint 3 - Repyment contract workflow
Create repayment contract with a way to repay a funded project to the correct wallet. There should be a test for every method.

## Sprint 4 - Repayment UI
Add in a way to "log in". There should be no grand changes to the UI. You should see all of your projects that need to be repayed. When you click on the button and successfully repay the button text should say "Completed" and the contdown should end.

## Personal Branch
I made this branch for test projects that aren't related to the course material. I just built them to build them.