# Matter-Particles
Matter-Particles makes creating particle effects extremely simple and easy in matter.js. Learning how to use Matter-Particles is easy since it was designed to look similar to matter.js.

## Creating a basic particle emitter
Creating a particle emitter can be done in as little as 4 lines of code. <br>
The first thing you need to do is create an engine. If you're new to matter.js or haven't used matter.js before, Matter-Particles will automatically create an engine for you:

    Particle.engine.create();
    
If you want, you can also add mouse control with `Particle.engine.createMouse().`<br>
After that, create a particle emitter:

    var Emitter = Particle.emitter;
    var emitter = Emitter.create(250, 250);
    
If you want, you can add more options to the emitter. However, you won't have to worry about that for this example.<br>
The last thing you need to do is add the emitter to the world. There are several ways to do this:

    //Option 1
    Emitter.explode(emitter);
    //Option 2
    emitter.explode();
    //Option 3
    emitter.start();
    
<br>
Once you've done this, you should see the particles on your screen.<br>
Here's the full code: <br>

	var Emitter = Particle.emitter;
	Particle.engine.create();
	var emitter = Emitter.create(250, 250);
	emitter.explode();

<br> 

# Options
If you want to change the behavior or the look of the emitter, there are several options to do so.
Options are placed after positions when creating a new emitter, like so: <br>
    
    var emitter = Emitters.create(250, 250, {
        amount: 20
    });
    
All options for emitters are listed below.
<br>

### `colors`
The `colors` option changes the color of the particles in that emitter. It can be either an array of all the possible colors _or_ a single color. The color of each particle is picked randomly from the set of colors provided.<br>
If not specified, the default value is `["#FE601C","#EBDB14","#EB471F","#ED7A0E"]`

### `amount`
 `amount` specifies the number of particles emitted by that emitter. The number can be anything from zero to Infinity. If the number is Infinity, the emitter will always emit particles until emitter.stop() is used. <br>
 `amount` cannot be Infinity if the `interval` is 0. Otherwise, it will throw an error and the `interval` will be reset to 1 to avoid crashing the browser.<br>
 If not specified, the default value is `50`
 
### `interval`
 `interval` specifies the time (in milliseconds) between each particle's creation. If `interval` is 0, all of the particles will be created at the same time. <br>
 If not specified, the default value is `0`

### `collisions`
 `collisions` specifies whether the particles can collide with other bodies.<br>
 If `false`, the particles will be a sensor (See [Body.isSensor](http://brm.io/matter-js/docs/classes/Body.html#property_isSensor)). Sensors still trigger collision events in matter.js, so particles always have the property `isParticle` set to `true` to make it easier to block out collisions from particles.<br>
 If `true`, the particles will collide with other bodies in the world, including other particles.


### `size`
 `size` specifies the radius of the particles. It can either be a number or an `object` with the properties `min` and `max` <br>
 If `min` and `max` are specified, the particles' radius will be a random number in between the `min` and the `max` <br>
 If `size` is a number, the particles will always have a radius of `size` <br>
 If `size` is not specified, its default value is `{min: 0.5, max: 2}`

### `isStatic`
 `isStatic` specifies whether the particles are a static body or not. It can have the values `true` or `false`. <br>
 If `isStatic` is `true`, `velocity` won't be affective.<br>
 If not specified, its default value is `false`

### `velocity`
 `velocity` specifies the maximum velocity the particles can have. It is an `object` with 3 properties: 
 <br>
 `x` is the maximum velocity a particle can have on the x axis.<br>
 `y` is the maximum velocity a particle can have on the y axis.

 #### `direction`
 `direction` is an `object` that specifies the general direction the particles will go. It has the properties `x` and `y`. If a property is `none`, particles will go in both directions on that axis. Properties not specified have a default value of `none`.<br>
 `x` can either `left`, `right`, `none`, or a number between -1 and 1.<br>
 `y` can either `up`, `down`, `none`, or a number between -1 and 1.<br>

### `frictionAir`
 `frictionAir` specifies the air friction of the particle bodies. It can be a number between `0` and `1`. <br>
 The default value for `frictionAir` is `0.02`.

### `delay`
 `delay` is the delay (in milliseconds) before particles start to dissapear.
 The default value for `delay` is `400`.

### `parent`
 `parent` is the object that the particle emitter will follow. When the object moves, the x and y of the emitter is updated to match the x and y of the parent. <br>
 If the object does not move, it is suggested to change the `x` and `y` of the emitter rather than specify `parent` to improve performance.

### `collisionFilter`
 `collisionFilter` is the collisionFilter used by the particles. For more information on collisionFilters, see [Body.collisionFilter](http://brm.io/matter-js/docs/classes/Body.html#property_collisionFilter)

