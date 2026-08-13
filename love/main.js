// =====================================================
// GLOBAL SETTINGS
// =====================================================

var radius = 400;

var autoRotate = true;

// Seconds per 360° rotation
var rotateSpeed = -60;

// Original image size
var imgWidth = 120;
var imgHeight = 170;


// =====================================================
// ELEMENTS
// =====================================================

var odrag = document.getElementById("drag-container");
var ospin = document.getElementById("spin-container");
var ground = document.getElementById("ground");

var aImg = ospin.getElementsByTagName("img");
var aVid = ospin.getElementsByTagName("video");

var aEle = [...aImg, ...aVid];


// =====================================================
// IMAGE SIZE
// =====================================================

ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";


// =====================================================
// GROUND SIZE
// =====================================================

ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";


// =====================================================
// INITIALIZE 3D IMAGES
// =====================================================

function init(delayTime) {

    for (var i = 0; i < aEle.length; i++) {

        var angle =
            i * (360 / aEle.length);

        aEle[i].style.transform =
            "rotateY(" +
            angle +
            "deg) translateZ(" +
            radius +
            "px)";

        aEle[i].style.transition =
            "transform 1s";

        aEle[i].style.transitionDelay =
            delayTime ||
            (aEle.length - i) / 4 +
            "s";
    }
}


// =====================================================
// START AFTER PAGE LOAD
// =====================================================

setTimeout(function () {

    init();

}, 1000);


// =====================================================
// DRAG ROTATION VARIABLES
// =====================================================

var sX = 0;
var sY = 0;

var nX = 0;
var nY = 0;

var desX = 0;
var desY = 0;

var tX = 0;
var tY = 10;


// =====================================================
// APPLY DRAG TRANSFORM
// =====================================================

function applyTranform(obj) {

    // Limit vertical rotation

    if (tY > 180) {
        tY = 180;
    }

    if (tY < 0) {
        tY = 0;
    }

    obj.style.transform =
        "rotateX(" +
        (-tY) +
        "deg) rotateY(" +
        tX +
        "deg)";
}


// =====================================================
// PLAY / PAUSE SPIN
// =====================================================

function playSpin(yes) {

    ospin.style.animationPlayState =
        yes ? "running" : "paused";
}


// =====================================================
// AUTO ROTATION
// =====================================================

if (autoRotate) {

    var animationName =
        rotateSpeed > 0
            ? "spin"
            : "spinRevert";

    ospin.style.animation =
        animationName +
        " " +
        Math.abs(rotateSpeed) +
        "s infinite linear";
}


// =====================================================
// POINTER DRAG
// =====================================================

document.onpointerdown = function (e) {

    e = e || window.event;

    clearInterval(odrag.timer);

    sX = e.clientX;
    sY = e.clientY;

    playSpin(false);


    this.onpointermove = function (e) {

        e = e || window.event;

        nX = e.clientX;
        nY = e.clientY;

        desX = nX - sX;
        desY = nY - sY;

        tX += desX * 0.1;
        tY += desY * 0.1;

        applyTranform(odrag);

        sX = nX;
        sY = nY;
    };


    this.onpointerup = function () {

        this.onpointermove = null;
        this.onpointerup = null;


        odrag.timer = setInterval(function () {

            desX *= 0.95;
            desY *= 0.95;

            tX += desX * 0.1;
            tY += desY * 0.1;

            applyTranform(odrag);


            if (
                Math.abs(desX) < 0.5 &&
                Math.abs(desY) < 0.5
            ) {

                clearInterval(odrag.timer);

                playSpin(true);
            }

        }, 17);
    };


    return false;
};


// =====================================================
// MOUSE WHEEL / ZOOM
// =====================================================

document.onmousewheel =
document.onwheel = function (e) {

    e = e || window.event;

    var delta =
        e.wheelDelta
            ? e.wheelDelta / 20
            : -e.deltaY / 20;


    radius += delta;


    // Minimum radius

    if (radius < 300) {
        radius = 300;
    }


    // Maximum radius

    if (radius > 700) {
        radius = 700;
    }


    // Update ground

    ground.style.width =
        radius * 3 + "px";

    ground.style.height =
        radius * 3 + "px";


    // Re-position images

    init(1);
};


// =====================================================
// WEBGL HEART EFFECT
// =====================================================

var canvas =
    document.getElementById("canvas");


if (canvas) {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    // =================================================
    // WEBGL CONTEXT
    // =================================================

    var gl =
        canvas.getContext("webgl");


    if (!gl) {

        console.error(
            "Unable to initialize WebGL."
        );

    } else {


        // =================================================
        // TIME
        // =================================================

        var time = 0.0;


        // =================================================
        // VERTEX SHADER
        // =================================================

        var vertexSource = `

            attribute vec2 position;

            void main() {

                gl_Position =
                    vec4(
                        position,
                        0.0,
                        1.0
                    );
            }

        `;


        // =================================================
        // FRAGMENT SHADER
        // =================================================

        var fragmentSource = `

            precision highp float;

            uniform float width;
            uniform float height;
            uniform float time;

            vec2 resolution =
                vec2(width, height);

            #define POINT_COUNT 8

            vec2 points[POINT_COUNT];

            const float speed = -0.5;
            const float len = 0.25;

            float intensity = 1.3;
            float radius = 0.008;


            float sdBezier(
                vec2 pos,
                vec2 A,
                vec2 B,
                vec2 C
            ) {

                vec2 a = B - A;

                vec2 b =
                    A -
                    2.0 * B +
                    C;

                vec2 c =
                    a * 2.0;

                vec2 d =
                    A - pos;

                float kk =
                    1.0 /
                    dot(b, b);

                float kx =
                    kk *
                    dot(a, b);

                float ky =
                    kk *
                    (
                        2.0 *
                        dot(a, a)
                        +
                        dot(d, b)
                    ) / 3.0;

                float kz =
                    kk *
                    dot(d, a);

                float p =
                    ky -
                    kx * kx;

                float p3 =
                    p * p * p;

                float q =
                    kx *
                    (
                        2.0 *
                        kx * kx -
                        3.0 * ky
                    )
                    +
                    kz;

                float h =
                    q * q +
                    4.0 * p3;

                float res = 0.0;


                if (h >= 0.0) {

                    h = sqrt(h);

                    vec2 x =
                        (
                            vec2(h, -h) -
                            q
                        ) / 2.0;

                    vec2 uv =
                        sign(x) *
                        pow(
                            abs(x),
                            vec2(1.0 / 3.0)
                        );

                    float t =
                        uv.x +
                        uv.y -
                        kx;

                    t =
                        clamp(
                            t,
                            0.0,
                            1.0
                        );

                    vec2 qos =
                        d +
                        (
                            c +
                            b * t
                        ) * t;

                    res =
                        length(qos);

                } else {

                    float z =
                        sqrt(-p);

                    float v =
                        acos(
                            q /
                            (p * z * 2.0)
                        ) / 3.0;

                    float m =
                        cos(v);

                    float n =
                        sin(v) *
                        1.732050808;

                    vec3 t =
                        vec3(
                            m + m,
                            -n - m,
                            n - m
                        ) * z -
                        kx;

                    t =
                        clamp(
                            t,
                            0.0,
                            1.0
                        );

                    vec2 qos =
                        d +
                        (
                            c +
                            b * t.x
                        ) * t.x;

                    float dis =
                        dot(qos, qos);

                    res = dis;


                    qos =
                        d +
                        (
                            c +
                            b * t.y
                        ) * t.y;

                    dis =
                        dot(qos, qos);

                    res =
                        min(res, dis);


                    qos =
                        d +
                        (
                            c +
                            b * t.z
                        ) * t.z;

                    dis =
                        dot(qos, qos);

                    res =
                        min(res, dis);


                    res =
                        sqrt(res);
                }


                return res;
            }


            // =================================================
            // HEART POSITION
            // =================================================

            vec2 getHeartPosition(float t) {

                return vec2(

                    16.0 *
                    sin(t) *
                    sin(t) *
                    sin(t),

                    -(
                        13.0 * cos(t)
                        -
                        5.0 * cos(2.0 * t)
                        -
                        2.0 * cos(3.0 * t)
                        -
                        cos(4.0 * t)
                    )
                );
            }


            // =================================================
            // GLOW
            // =================================================

            float getGlow(
                float dist,
                float radius,
                float intensity
            ) {

                return pow(
                    radius / dist,
                    intensity
                );
            }


            // =================================================
            // HEART SEGMENT
            // =================================================

            float getSegment(
                float t,
                vec2 pos,
                float offset,
                float scale
            ) {

                for (
                    int i = 0;
                    i < POINT_COUNT;
                    i++
                ) {

                    points[i] =
                        getHeartPosition(
                            offset
                            +
                            float(i) * len
                            +
                            fract(
                                speed * t
                            ) * 6.28
                        );
                }


                vec2 c =
                    (
                        points[0] +
                        points[1]
                    ) / 2.0;


                vec2 c_prev;

                float dist = 10000.0;


                for (
                    int i = 0;
                    i < POINT_COUNT - 1;
                    i++
                ) {

                    c_prev = c;

                    c =
                        (
                            points[i] +
                            points[i + 1]
                        ) / 2.0;


                    dist =
                        min(
                            dist,
                            sdBezier(
                                pos,
                                scale * c_prev,
                                scale * points[i],
                                scale * c
                            )
                        );
                }


                return max(
                    0.0,
                    dist
                );
            }


            // =================================================
            // MAIN
            // =================================================

            void main() {

                vec2 uv =
                    gl_FragCoord.xy /
                    resolution.xy;


                float ratio =
                    resolution.x /
                    resolution.y;


                vec2 centre =
                    vec2(
                        0.5,
                        0.5
                    );


                vec2 pos =
                    centre - uv;


                pos.y /= ratio;

                pos.y += 0.02;


                float scale =
                    0.000015 *
                    height;


                float t =
                    time;


                // ---------------------------------------------
                // FIRST HEART SEGMENT
                // ---------------------------------------------

                float dist =
                    getSegment(
                        t,
                        pos,
                        0.0,
                        scale
                    );


                float glow =
                    getGlow(
                        dist,
                        radius,
                        intensity
                    );


                vec3 col =
                    vec3(0.0);


                // White core

                col +=
                    10.0 *
                    vec3(
                        smoothstep(
                            0.003,
                            0.001,
                            dist
                        )
                    );


                // Pink glow

                col +=
                    glow *
                    vec3(
                        1.0,
                        0.05,
                        0.3
                    );


                // ---------------------------------------------
                // SECOND HEART SEGMENT
                // ---------------------------------------------

                dist =
                    getSegment(
                        t,
                        pos,
                        3.4,
                        scale
                    );


                glow =
                    getGlow(
                        dist,
                        radius,
                        intensity
                    );


                // White core

                col +=
                    10.0 *
                    vec3(
                        smoothstep(
                            0.003,
                            0.001,
                            dist
                        )
                    );


                // Blue glow

                col +=
                    glow *
                    vec3(
                        0.1,
                        0.4,
                        1.0
                    );


                // Tone mapping

                col =
                    1.0 -
                    exp(-col);


                // Gamma

                col =
                    pow(
                        col,
                        vec3(0.4545)
                    );


                gl_FragColor =
                    vec4(
                        col,
                        1.0
                    );
            }

        `;


        // =================================================
        // RESIZE
        // =================================================

        var widthHandle;
        var heightHandle;


        function onWindowResize() {

            canvas.width =
                window.innerWidth;

            canvas.height =
                window.innerHeight;


            gl.viewport(
                0,
                0,
                canvas.width,
                canvas.height
            );


            if (widthHandle) {

                gl.uniform1f(
                    widthHandle,
                    window.innerWidth
                );
            }


            if (heightHandle) {

                gl.uniform1f(
                    heightHandle,
                    window.innerHeight
                );
            }
        }


        window.addEventListener(
            "resize",
            onWindowResize,
            false
        );


        // =================================================
        // COMPILE SHADER
        // =================================================

        function compileShader(
            shaderSource,
            shaderType
        ) {

            var shader =
                gl.createShader(
                    shaderType
                );


            gl.shaderSource(
                shader,
                shaderSource
            );


            gl.compileShader(shader);


            if (
                !gl.getShaderParameter(
                    shader,
                    gl.COMPILE_STATUS
                )
            ) {

                console.error(
                    gl.getShaderInfoLog(shader)
                );

                return null;
            }


            return shader;
        }


        // =================================================
        // ATTRIBUTE LOCATION
        // =================================================

        function getAttribLocation(
            program,
            name
        ) {

            var location =
                gl.getAttribLocation(
                    program,
                    name
                );


            if (location === -1) {

                throw new Error(
                    "Cannot find attribute " +
                    name
                );
            }


            return location;
        }


        // =================================================
        // UNIFORM LOCATION
        // =================================================

        function getUniformLocation(
            program,
            name
        ) {

            var location =
                gl.getUniformLocation(
                    program,
                    name
                );


            if (location === null) {

                throw new Error(
                    "Cannot find uniform " +
                    name
                );
            }


            return location;
        }


        // =================================================
        // CREATE SHADERS
        // =================================================

        var vertexShader =
            compileShader(
                vertexSource,
                gl.VERTEX_SHADER
            );


        var fragmentShader =
            compileShader(
                fragmentSource,
                gl.FRAGMENT_SHADER
            );


        if (
            !vertexShader ||
            !fragmentShader
        ) {

            console.error(
                "WebGL shader creation failed."
            );

        } else {


            // =================================================
            // CREATE PROGRAM
            // =================================================

            var program =
                gl.createProgram();


            gl.attachShader(
                program,
                vertexShader
            );


            gl.attachShader(
                program,
                fragmentShader
            );


            gl.linkProgram(program);


            if (
                !gl.getProgramParameter(
                    program,
                    gl.LINK_STATUS
                )
            ) {

                console.error(
                    gl.getProgramInfoLog(program)
                );

            } else {

                gl.useProgram(program);


                // =================================================
                // VERTEX DATA
                // =================================================

                var vertexData =
                    new Float32Array([

                        -1.0, 1.0,

                        -1.0, -1.0,

                        1.0, 1.0,

                        1.0, -1.0

                    ]);


                // =================================================
                // BUFFER
                // =================================================

                var vertexDataBuffer =
                    gl.createBuffer();


                gl.bindBuffer(
                    gl.ARRAY_BUFFER,
                    vertexDataBuffer
                );


                gl.bufferData(
                    gl.ARRAY_BUFFER,
                    vertexData,
                    gl.STATIC_DRAW
                );


                // =================================================
                // POSITION
                // =================================================

                var positionHandle =
                    getAttribLocation(
                        program,
                        "position"
                    );


                gl.enableVertexAttribArray(
                    positionHandle
                );


                gl.vertexAttribPointer(
                    positionHandle,
                    2,
                    gl.FLOAT,
                    false,
                    2 * 4,
                    0
                );


                // =================================================
                // UNIFORMS
                // =================================================

                var timeHandle =
                    getUniformLocation(
                        program,
                        "time"
                    );


                widthHandle =
                    getUniformLocation(
                        program,
                        "width"
                    );


                heightHandle =
                    getUniformLocation(
                        program,
                        "height"
                    );


                gl.uniform1f(
                    widthHandle,
                    window.innerWidth
                );


                gl.uniform1f(
                    heightHandle,
                    window.innerHeight
                );


                // =================================================
                // DRAW LOOP
                // =================================================

                var lastFrame =
                    Date.now();


                function draw() {

                    var thisFrame =
                        Date.now();


                    time +=
                        (
                            thisFrame -
                            lastFrame
                        ) / 1000;


                    lastFrame =
                        thisFrame;


                    gl.uniform1f(
                        timeHandle,
                        time
                    );


                    gl.drawArrays(
                        gl.TRIANGLE_STRIP,
                        0,
                        4
                    );


                    requestAnimationFrame(
                        draw
                    );
                }


                draw();
            }
        }
    }
}


// =====================================================
// OPTIONAL AUDIO HELPER
// =====================================================

var audio =
    document.getElementById("myAudio");


if (audio) {

    audio.volume = 0.7;

    audio.loop = true;


    document.addEventListener(
        "pointerdown",
        function () {

            if (audio.paused) {

                audio.play().catch(
                    function () {}
                );
            }

        },
        {
            once: true
        }
    );
}