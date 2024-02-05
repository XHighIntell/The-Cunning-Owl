var storyteller;
(function (storyteller) {
    var ctrl;
    (function (ctrl) {
        class Comet2 {
            constructor() {
                const element = this.element = $(`<div class="comet2" style="display:none"></div>`)[0];
            }
            element;
            get headColor() {
                return this.element.style.getPropertyValue('--head-color');
            }
            set headColor(value) {
                this.element.style.setProperty('--head-color', value);
            }
            start(x0, y0, angle, speed, endWidth) {
                const distance = 2000;
                const rad = angle / 180 * Math.PI;
                const x = -distance * Math.cos(rad);
                const y = distance * Math.sin(rad);
                this.element.style.left = x0 + 'px';
                this.element.style.top = y0 + 'px';
                this.element.style.transform = `rotateZ(${-angle}deg)`;
                this.element.style.transitionDuration = `${distance / speed}s`;
                this.element.offsetHeight;
                intell.ctrl.show(this.element);
                this.element.offsetHeight;
                this.element.style.transform = `translateX(${x}px) translateY(${y}px) rotateZ(${-angle}deg)`;
                this.element.style.width = `${endWidth ?? 500}px`;
                this.element.style.opacity = '0';
            }
        }
        ctrl.Comet2 = Comet2;
        class Comet {
            constructor(parentElement) {
                const element = this.#element = $(`<div class="Comet comet3"></div>`)[0];
                this.width = 30;
                if (parentElement != null)
                    parentElement.appendChild(element);
            }
            #element;
            #x = 0;
            #y = 0;
            #width;
            #angle = 0;
            speed = 400;
            speedIncreasement = 0;
            fadeInDuration = 0;
            fadeOutAt = 2;
            fadeOutDuration = 1;
            widthIncreasement = 0;
            #time = 0;
            get element() { return this.#element; }
            get x() { return this.#x; }
            set x(value) {
                this.#x = value;
                this.#element.style.left = this.#x + 'px';
            }
            get y() { return this.#y; }
            set y(value) {
                this.#y = value;
                this.#element.style.top = this.#y + 'px';
            }
            get angle() { return this.#angle; }
            set angle(value) {
                this.#angle = value;
                this.#element.style.transform = `rotateZ(${-this.#angle}deg)`;
            }
            get width() { return this.#width; }
            set width(value) {
                this.#width = value;
                this.#element.style.width = value + 'px';
            }
            get headColor() { return this.#element.style.getPropertyValue('--head-color'); }
            set headColor(value) { this.#element.style.setProperty('--head-color', value); }
            get isDestroyed() {
                return this.#time > this.fadeOutAt + this.fadeOutDuration;
            }
            ended = false;
            update(elapsedTime) {
                if (this.ended == true)
                    return;
                this.#time += elapsedTime;
                // position
                const rad = this.#angle / 180 * Math.PI;
                const speed = this.speed;
                this.x = this.#x - speed * Math.cos(rad) * elapsedTime;
                this.y = this.#y + speed * Math.sin(rad) * elapsedTime;
                // width
                this.width = this.#width + this.widthIncreasement * elapsedTime;
                // speed
                this.speed = this.speed + this.speedIncreasement * elapsedTime;
                if (this.speed < 0)
                    this.speed = 0;
                // opacity
                let opacity = 1;
                if (this.#time <= this.fadeInDuration) {
                    opacity = this.#time / this.fadeInDuration;
                }
                else if (this.#time > this.fadeOutAt) {
                    opacity = 1 - (this.#time - this.fadeOutAt) / this.fadeOutDuration;
                }
                else
                    opacity = 1;
                this.element.style.opacity = opacity.toString();
                if (this.#time > this.fadeOutAt + this.fadeOutDuration) {
                    this.ended = true;
                    this.#element.remove();
                }
            }
        }
        ctrl.Comet = Comet;
        class Moon {
            constructor(parentElement) {
                const element = this.#element = $(`<div class="moon">
    <div></div>
    <div></div>
    <div></div>
</div>`)[0];
                this.width = 80;
                this.height = 80;
                if (parentElement != null)
                    parentElement.appendChild(element);
            }
            #element;
            #x = 0;
            #y = 0;
            #width = 0;
            #height = 0;
            #time = 0;
            get element() { return this.#element; }
            get x() { return this.#x; }
            set x(value) {
                this.#x = value;
                this.#element.style.left = this.#x + 'px';
            }
            get y() { return this.#y; }
            set y(value) {
                this.#y = value;
                this.#element.style.top = this.#y + 'px';
            }
            get width() { return this.#width; }
            set width(value) {
                this.#width = value;
                this.#element.style.width = value + 'px';
            }
            get height() { return this.#height; }
            set height(value) {
                this.#height = value;
                this.#element.style.height = value + 'px';
            }
            update(elapsedTime) {
            }
        }
        ctrl.Moon = Moon;
        class Fireworks {
            constructor(parentElement) {
                const element = this.#element = $(`<div class="Fireworks"></div>`)[0];
                if (parentElement != null)
                    parentElement.appendChild(element);
            }
            #element;
            #x = 0;
            #y = 0;
            #style;
            #hue;
            #maxImageIndex = 0;
            #imagesPerRow = 0;
            #sinceLastTime = 0;
            #imageIndex = 0;
            #interval = 1 / 60;
            get x() { return this.#x; }
            set x(value) {
                this.#x = value;
                this.#element.style.left = this.#x + 'px';
            }
            get y() { return this.#y; }
            set y(value) {
                this.#y = value;
                this.#element.style.top = this.#y + 'px';
            }
            get style() { return this.#style; }
            set style(value) {
                if (value == 'SHORT') {
                    this.#element.style.backgroundImage = "url('/static/img/fireworks-short.png')";
                    this.#imagesPerRow = 9;
                    this.#maxImageIndex = 33;
                }
                else if (value == 'MEDIUM') {
                    this.#element.style.backgroundImage = "url('/static/img/fireworks-medium.png')";
                    this.#imagesPerRow = 10;
                    this.#maxImageIndex = 57;
                }
                else if (value == 'LONG') {
                    this.#element.style.backgroundImage = "url('/static/img/fireworks-long.png')";
                    this.#imagesPerRow = 9;
                    this.#maxImageIndex = 89;
                }
                else
                    throw new Error('Not supported');
                this.#style = value;
            }
            get hue() { return this.hue; }
            set hue(value) {
                this.#element.style.filter = `hue-rotate(${value})`;
                this.#hue = value;
            }
            ended = false;
            random() {
                this.style = Fireworks.STYLES[Math.round(Math.random() * (Fireworks.STYLES.length - 1))];
                this.hue = Math.random() * 360 + 'deg';
            }
            update(elapsedTime) {
                if (this.style == null)
                    throw new Error('Please set Fireworks.style before run.');
                if (this.#imageIndex > this.#maxImageIndex) {
                    if (this.ended === false) {
                        this.#element.remove();
                        this.ended = true;
                    }
                    return;
                }
                this.#sinceLastTime += elapsedTime;
                if (this.#sinceLastTime >= this.#interval) {
                    this.#sinceLastTime = 0;
                    this.#imageIndex += 1;
                    const x = this.#imageIndex % this.#imagesPerRow;
                    const y = (this.#imageIndex - x) / this.#imagesPerRow;
                    this.#element.style.backgroundPositionX = (-x * 256) + 'px';
                    this.#element.style.backgroundPositionY = (-y * 256) + 'px';
                }
                // animation:0.2s steps(9) 0s 4 normal none running fireworksX, 0.8s steps(4) 0s 1 normal forwards running fireworksY
                // animation: 0.2s steps(9) 0s 4 normal none running chatroomeffects_fireworkBigX_9TN1P, 0.8s steps(4) 0s 1 normal forwards running chatroomeffects_fireworkBigY_z5EHL;
            }
            static STYLES = ["SHORT", "MEDIUM", "LONG"];
        }
        ctrl.Fireworks = Fireworks;
        class Star {
            constructor(parentElement) {
                const element = this.#element = $(`<div class="Star"></div>`)[0];
                element.style.backgroundImage = "url('https://ivang-design.com//svg-load/air/star.png')";
                if (parentElement != null)
                    parentElement.appendChild(element);
            }
            #element;
            #x = 0;
            #y = 0;
            #width = 0;
            #height = 0;
            #time = 0;
            get element() { return this.#element; }
            get x() { return this.#x; }
            set x(value) {
                this.#x = value;
                this.#element.style.left = this.#x + 'px';
            }
            get y() { return this.#y; }
            set y(value) {
                this.#y = value;
                this.#element.style.top = this.#y + 'px';
            }
            ended = false;
            #rotate = 0;
            // scale feature
            #scaleIsOnRunning = false;
            #scaleCooldown = 1 + Math.random() * 4;
            /** This value will run from 0 to 1 then to 0. */
            #scaleValue = 0;
            #scaleState = 0;
            #scale = 0.3;
            update(elapsedTime) {
                if (this.#scaleIsOnRunning == false) {
                    this.#scaleCooldown -= elapsedTime;
                    if (this.#scaleCooldown <= 0)
                        this.#scaleIsOnRunning = true;
                }
                else {
                    if (this.#scaleState == 0) {
                        this.#scaleValue += 1 * elapsedTime;
                        if (this.#scaleValue >= 1) {
                            //this.#scaleValue = 1;
                            this.#scaleState = 1;
                        }
                    }
                    else {
                        this.#scaleValue -= 1 * elapsedTime;
                        if (this.#scaleValue <= 0) {
                            this.#scaleIsOnRunning = false;
                            this.#scaleCooldown = 1 + Math.random() * 4;
                            this.#scaleState = 0;
                        }
                    }
                }
                this.#rotate += elapsedTime * 411;
                this.#scale = 0.4 + 0.6 * this.#scaleValue;
                this.#element.style.transform = `scale(${this.#scale}) rotate(${this.#rotate}deg)`;
            }
        }
        ctrl.Star = Star;
    })(ctrl = storyteller.ctrl || (storyteller.ctrl = {}));
})(storyteller || (storyteller = {}));
var storyteller;
(function (storyteller) {
    function radToDeg(rad) {
        return rad / Math.PI * 180;
    }
    storyteller.radToDeg = radToDeg;
    function degToRad(deg) {
        return deg * Math.PI / 180;
    }
    storyteller.degToRad = degToRad;
})(storyteller || (storyteller = {}));
