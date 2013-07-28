
## Where is dave? - A geographic visualiser for your trip photos

Reads your photos from FB, plots them on a sweet spinnable globe, and gives you an album view.  

Cool features:

- Click on any orange point to spin to that point on the globe, and show the photos from there.
- Drag the slider at the bottom to scroll through your photos & track your trip around the globe.
- Hit 'Play' for a super quick animated tour through the whole set.

The app needs permission to read your photos for obvious reasons. I don't do anything with your facebook data, if you don't believe me, look in the JS.

100% client JS, no server involved.

### Why?

Because SVG 3D globes are rad.  
I've been travelling for awhile, and uploading my photos to FB to share with family and friends. FB lets you geotag photos, but dosent provide any decent way to view them across the world(their trips thing sucks).  
I was originally going to do it off Dropbox, but they changed their sharing API & made it too hard to get at your photos publically. 


### I loaded my photos and it looks horrible

A few tips for cleaning up your FB photos so that they can be plotted cleanly:

- They need to be dated correctly, in order of your trip. Facebook by default dates your photos to their upload date, not the date taken. The ways to fix this, in order of ease:
  - Date each album with the correct date. 
  - Date each individual photo in your album(s) with the correct date. EASY WAY: There's a new button at the top right of an album while you're editing it "Edit dates -> Get date from EXIF data", which will read the proper created_at from your photos. I have no idea why this isnt the default.

- Geotag their place location. *Photos that dont have a place associated with them wont be plotted*. The easiest way to do this is at the album level. You can individually place tag each photo if you want greater precision/more points on your trip or you are a masochist.


### Why is your JS so [NEGATIVE ADJECTIVE]

I had no idea whether this would even be possible, so it was built as an evolving POC. 


### Future plans?

If people find it cool I might add a way to save your location json somewhere so you can share your globe with other people.
I also thought it would be cool to read photos from other cloud sources(Dropbox) and plot using the EXIF data from there. 


### Credits

- D3 & the D3 spinning globe example, which is where I adopted the basic globe drawing code from. 
