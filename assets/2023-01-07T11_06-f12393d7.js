const e=`# Translating source code? Madness!

## Local vs global

So, I decided to translate the UI for one of my old portfolio applications, [Othello](https://jupekett.github.io/portfolio.html#react), to english.
Like most of my programming exercises from JYU, this game was coded entirely in finnish.
Previously I felt somewhat awkward presenting that application to an unknown audience, knowing that the UI was not created with future observers in mind.

Aaand done! End of blog post.

But when I saw the recently translated interface elements in between all the finnish variables, I was torn: bilingual source code _really_ doesn't look good!
Then I knew I had to do the unthinkable: **translate all the source code**, for my own sake... and hopefully to the benefit of the occasional non-finnish reader.

## Into the fray

[1700 lines of JS](https://gitlab.jyu.fi/jupekett/othello-react/-/blob/e0fe5c00ebb40dc1cc185e9d1fd1dbee5f030b2a/js/scripts.js) in total.
At first the task didn't seem so bad.
Just let IDE do the heavy lifting, right?
**JetBrains WebStorm** has convenient refactoring capabilities after all.
But at some point I noticed that not every necessary change is detected out of the box:

- React prop names that are passed between components
- React state object properties for state updates
- inline \`cssText\` in JavaScript files
- any string interpolation shenanigans

This resulted in the application breaking entirely maybe 20% of the way in.
Woe is me! But that point was kind of liberating.
Now I could - with good conscience - use oldschool regular expressions and search-replace with wild abandon.

*...[hacking away](https://gitlab.jyu.fi/jupekett/othello-react/-/commit/c8c1152fc448e90e08075a9c678a64a5276dc0da) trying not to chop off any major limbs...*

And finally the application springs back to life!
A moment of relief, for sure.

## Polishing. Polerowanie? Almost un-finnished...

After first translation pass I came across and fixed some bugs I had introduced by altering string templates and typo'ed variable names.
CSS style usage was pretty minimal, so
[that part](https://gitlab.jyu.fi/jupekett/othello-react/-/commit/6f9910d99f7ee40f07846d97d1fed5e76d4e6c67)
was fast.
Although it felt like a slog, revisiting
[documentation](https://gitlab.jyu.fi/jupekett/othello-react/-/commit/10ce60b0922c18eca776638559f8baa00cf06574)
[comments](https://gitlab.jyu.fi/jupekett/othello-react/-/commit/fb405e44dd8fa900781a8f2750cb8c6f0acafd2b)
was also a nice reminder of what was going through my mind back in 2020 during the exercise

Some of my troubles could probably have been avoided with proper IDE configuration, usage of **React PropTypes**, a suite of unit tests, etc.
But at least now this old project is more presentable than before.
It was a great opportunity for minor improvements, such as adding specificity to ambiguous variable names.

***If it works, don't touch it***.
I've understood that these are usually the words to live by when working with large production codebases.
I would be hard-pressed to repeat this same translation exercise to one of those.
Addressing technical debt through thoughtful refactoring is another story.
Even if non-physical, software requires care and maintenance to ensure its value in the long term.
Speaking of which, another portfolio project has (again) stopped working after a 3rd party data source became unavailable... 

## Closing thoughts

When I first began learning the basics of programming, I found that using my native tongue is useful in maintaining a mental distinction between programming language keywords and my own definitions.
These days I appreciate international cooperation more, though, thanks to working in multinational software teams at
[Nordcloud](https://nordcloud.com/).

This application's UI is still rudimentary, React idioms outdated, and structure constrained by the CDN version of React not allowing modularization.
Still, I'm proud that I figured out the core logic back then.
I especially enjoyed dialing in the game loop and calculating legal moves for each turn.
Maybe I'm more backend kind of guy than a frontend maestro?

Some old portfolio projects remain fully finnish, but I likely won't touch them at this point.
I'll rather create new works with modern tech, fresh insights and updated skills.
I have some ideas brewing.
Maybe this very site will finally receive a frontend framework as its core... 

## PS

I introduced a small frontend improvement to portfolio page by adding fade-in-n-out for image previews.
Cheers!
`;export{e as default};
