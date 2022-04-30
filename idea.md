## Initial Idea
~Micro-loans~
~1. users register themselves~
~2. users can see any open micro loans~
~3. users "apply" for funds~
~4. agreement is made~
~5. transaction happens~

I didn't like the complecity around this idea

## Final Idea
small message board. To write a message you have to $1, $5, $10, $15. Similar to needing send bits to chat in a discord chat.

### Why the change
I felt like the project idea I had took too much time and was too large of a scope for this course.

## Things to look out for
1. Not allow anyone to remove money that isn't the owner
2. Have a cool down period

## Donation object
```
Donation {
    user: address,
    message: string,
    amount: uint
}
```