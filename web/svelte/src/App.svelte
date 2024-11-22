<script>
	import {Click, Rotate, Slide, SlideRegion, Button} from "go-captcha-svelte";
	// Cache Testing
  // import {Click, Rotate, Slide, SlideRegion, Button} from "./cache/dist/index.js";
  import {useClickHandler} from "./hooks/useClickHandler.js";
  import {useSlideHandler} from "./hooks/useSlideHandler.js";
  import {useRotateHandler} from "./hooks/useRotateHandler.js";
  import {onMount} from "svelte";
  import {get} from 'svelte/store';
  import {Toaster} from 'svelte-french-toast'

	let type = "default"

  let clickRef;
  const clickHandler = useClickHandler({
    getApi: "/api/go-captcha-data/click-basic",
    checkApi: "/api/go-captcha-check-data/click-basic",
  })
  let clickData = get(clickHandler.data)
  clickHandler.data.subscribe(value => {
    clickData = value
  });

  let slideRef;
  const slideHandler = useSlideHandler({
    getApi: "/api/go-captcha-data/slide-basic",
    checkApi: "/api/go-captcha-check-data/slide-basic",
  })
  let slideData = get(slideHandler.data)
  slideHandler.data.subscribe(value => {
    slideData = value
  });

  let slideRegionRef;
  const slideRegionHandler = useSlideHandler({
    getApi: "/api/go-captcha-data/slide-region",
    checkApi: "/api/go-captcha-check-data/slide-region"
  })
  let slideRegionData = get(slideRegionHandler.data)
  slideRegionHandler.data.subscribe(value => {
    slideRegionData = value
  });

  let rotateRef;
  const rotateHandler = useRotateHandler({
    getApi: "/api/go-captcha-data/rotate-basic",
    checkApi: "/api/go-captcha-check-data/rotate-basic",
  })
  let rotateData = get(rotateHandler.data)
  rotateHandler.data.subscribe(value => {
    rotateData = value
  });

  onMount(() => {
    clickHandler.init(clickRef)
    slideHandler.init(slideRef)
    slideRegionHandler.init(slideRegionRef)
    rotateHandler.init(rotateRef)
  })

  const clickEvents = {
    click(x, y) {
      console.log("click >>>>>>>", x, y)
    },
    confirm(dots, reset) {
      console.log("dots >>>>>>>", dots)
      clickHandler.confirmEvent(dots)
    },
    refresh() {
      console.log("refresh >>>>>>>")
      clickHandler.refreshEvent()
      // clickRef.clear && clickRef.clear()
    },
    close() {
      console.log("close >>>>>>>")
    }
	}


	const slideEvents = {
    move(x, y) {
      console.log("move >>>>>>>", x, y)
    },
    confirm(point, reset) {
      console.log("point >>>>>>>", point)

      slideHandler.confirmEvent(point)
    },
    refresh() {
      console.log("refresh >>>>>>>")
      slideHandler.refreshEvent()
      // slideRef.clear && slideRef.clear()
    },
    close() {
      console.log("close >>>>>>>")
    }
	}

	const slideRegionEvents = {
    move(x, y) {
      console.log("move >>>>>>>", x, y)
    },
    confirm(point, reset) {
      console.log("point >>>>>>>", point)
      slideRegionHandler.confirmEvent(point)
    },
    refresh() {
      console.log("refresh >>>>>>>")
      // slideRegionRef.clear && slideRegionRef.clear()
      slideRegionHandler.refreshEvent()
    },
    close() {
      console.log("close >>>>>>>")
    }
	}

	const rotateEvents = {
    rotate(angle) {
      console.log("rotate >>>>>>>", angle)
    },
    refresh() {
      console.log("refresh >>>>>>>")
      // rotateRef.clear && rotateRef.clear()
      rotateHandler.refreshEvent()
    },
    confirm(point, reset) {
      console.log("point >>>>>>>", point)

      setTimeout(() => {
        reset()
      }, 2000)
      rotateHandler.confirmEvent(point)
    },
    close() {
      console.log("close >>>>>>>")
    }
	}
</script>

<div class="container">
  <Toaster />
  <br/>
  <br/>

  <Click data={clickData} events={clickEvents} bind:this={clickRef}/>
  <br/>

  <Slide data={slideData} events={slideEvents} bind:this={slideRef}/>
  <br />

  <SlideRegion data={slideRegionData} events={slideRegionEvents} bind:this={slideRegionRef}/>
  <br />

  <Rotate data={rotateData} events={rotateEvents} bind:this={rotateRef}/>
  <br />

  <Button clickEvent={() => type="warn"} type={type}/>

</div>


<style lang="css">
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

</style>