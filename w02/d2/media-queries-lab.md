<img src="https://i.imgur.com/qsSi07H.png">

# Media Queries - Lab

## Intro

Time for some practice using media queries to build layouts for different screen sizes!

This lab **is not a deliverable**.

## Responsive Design Lab: `@media` queries

Fluid layouts and flexbox have taken us a long way to making our site responsive and look good at different widths. But there tends to be a point (or two or three), where our fluid layouts look silly (way too much white space) or unreadable (text way too small).

What we want to do is write different rules for our css when the page gets to a certain breakpoint.

Often, the displays of elements is changed (`inline-block` to `block`), but we can change whatever rules we want.

Let's look at a quick demo.

The html has one div and inside of it an h1 element with some text.

The css:

```css
@import url('https://fonts.googleapis.com/css?family=Indie+Flower|Josefin+Slab');

.a {
  background: lemonchiffon;
  width: 100%;
  height: 400px;
  box-shadow: 4px 4px 10px black;
  border-radius: 1em;
  font-family: 'Indie Flower', cursive;
}

h1 {
  text-align: center;
  line-height: 5em;
}


@media (min-width: 600px){
  .a {
    background: plum;
    height: 200px;
    font-family: 'Josefin Slab', serif;
    text-shadow: 1px 1px 3px magenta;
  }
}
```

When the width is less than 600px - the div is lemonchiffon and the font is `Indie Flower`.

When the width is greater than 600px, the background color of the div is now plum, and the font has changed. The border radius has cascaded down into the media query. We have been able to add a magenta text shadow.

It is generally recommended to build the mobile version first.


## Setup

You will need to create 3 html files and 3 css files. Make sure each css file is properly linked to each html file. This could also be done in Repl.it if you prefer, but keep in mind the size of the viewport will be smaller.

Using divs, try to recreate the following simple responsive design wireframes. The images on the left represent the browser at desktop width while the images on the right represent the same browser but at mobile width. Remember: divs have a height of `0` when they have no content, so be sure to set `height` or `min-height`. Use `background` and set different colors for the divs to help visualize your work. [Get some color codes here](http://htmlcolorcodes.com/).

Set one breakpoint, in px for your `@media` queries i.e .`600px`. There is a lot of different options, but overall, we are still focusing on practicing layouts.

<hr>

## Create These Three Mockups

Each mockup has a full screen view and a mobile view.


![Mockup](https://i.imgur.com/NZ0moP0.png)

When solving these, don't worry about perfecting margins, getting the ratios exactly right, ending up with too much white space on the bottom or other fine details. Get the layouts first, move on to the next one, if there is time, refine.

ie: First Mockup

![first mockup desktop](https://i.imgur.com/wqtUtak.png)

![firstmockup mobile](https://i.imgur.com/AUjBZ1V.png)
