$(function () {
  // smoothscroll
  $('#navbar').find('.smoothscroll').on('click', function(e) {
    e.preventDefault();

    let hash = this.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top - 115
    }, 1000);
  });

  // navbar animation when scrolling down
  $(window).on('scroll', function () {
    let nav = $('#navbar');
    if ($(this).scrollTop() > 150) {
      nav.addClass('scrolled');
    } else {
      nav.removeClass('scrolled');
    }
  });
  $(window).scroll();

  // projects carousel
  let projectsContainer = $('#projects-container');
  projectsContainer.slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    dots: true,
    infinite: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
    if (currentSlide !== nextSlide) {
      projectsContainer.find('.contributions').collapse('hide');
    }
  }).on('afterChange', function(event, slick, currentSlide, nextSlide){
    if (currentSlide !== nextSlide) {
      projectsContainer.find('.slick-current .contributions').collapse('show');
    }
  });

  /**
   * Animations
   */

  // init scroll animations
  let scrollController = new ScrollMagic.Controller();

  // waves in header
  let waveWhite = new TimelineMax();
  waveWhite.to($('#wave-white'), 20, {backgroundPositionX:-300, repeatDelay:0, repeat:-1, yoyo:true, ease: Power1.easeInOut});
  waveWhite.play();

  let waveGrey1 = new TimelineMax();
  waveGrey1.to($('#wave-grey1'), 30, {backgroundPositionX:300, repeatDelay:0, repeat:-1, yoyo:true, ease: Power1.easeInOut});
  waveGrey1.play();

  let waveGrey2 = new TimelineMax();
  waveGrey2.to($('#wave-grey2'), 40, {backgroundPositionX:-250, repeatDelay:0, repeat:-1, yoyo:true, ease: Power1.easeInOut});
  waveGrey2.play();

  // octocat
  let octocatTween = new TweenMax.from('#octocat', 1, {scale: 0, opacity: 0, ease: Back.easeInOut});
  new ScrollMagic.Scene({triggerElement: '#github-trigger', offset: -300})
    .setTween(octocatTween)
    .reverse(false)
    .addTo(scrollController);

  // github text
  let githubTextTween = new TweenMax.from('#github-text', 1, {delay: .3, scale: 0, opacity: 0, ease: Back.easeInOut});
  new ScrollMagic.Scene({triggerElement: '#github-trigger', offset: -300})
    .setTween(githubTextTween )
    .reverse(false)
    .addTo(scrollController);

  // projects headline
  let projectsHeadlineTween = new TweenMax.from('#projects > #projects-header', 1, {opacity: 0, top: -10, ease: Back.easeInOut});
  new ScrollMagic.Scene({triggerElement: '#projects-trigger', offset: -100})
    .setTween(projectsHeadlineTween)
    .reverse(false)
    .addTo(scrollController);

  // project items
  let projectsTween = new TweenMax.staggerFrom('#projects .project', 1, {opacity: 0, top: -50, ease: Back.easeInOut, delay: .3}, .05);
  new ScrollMagic.Scene({triggerElement: '#projects-trigger', offset: -50})
    .setTween(projectsTween)
    .reverse(false)
    .addTo(scrollController);

  // project carousel dots
  let projectsDotsTween = new TweenMax.staggerFrom('#projects .slick-dots li', 1, {opacity: 0, top: -50, ease: Back.easeInOut, delay: .3}, .05);
  new ScrollMagic.Scene({triggerElement: '#projects-trigger', offset: -50})
    .setTween(projectsDotsTween)
    .reverse(false)
    .addTo(scrollController);

  // button below carousel
  // let projectsBtnTween = new TweenMax.from('#projects .all-projects', 1, {opacity: 0, ease: Linear.easeInOut, delay: .3});
  // new ScrollMagic.Scene({triggerElement: '#projects-trigger', offset: -50})
  //   .setTween(projectsBtnTween)
  //   .reverse(false)
  //   .addTo(scrollController);

  // topics headline
  let topicsHeadlineTween = new TweenMax.from('#topics > #topics-header', 1, {opacity: 0, top: -10, ease: Back.easeInOut});
  new ScrollMagic.Scene({triggerElement: '#topics', offset: -100})
    .setTween(topicsHeadlineTween)
    .reverse(false)
    .addTo(scrollController);

  // topic items
  let topicTween = new TweenMax.staggerFrom('#topics .topic', 1, {opacity: 0, top: -50, ease: Back.easeInOut, delay: .3}, .05);
  new ScrollMagic.Scene({triggerElement: '#topics', offset: -100})
    .setTween(topicTween)
    .reverse(false)
    .addTo(scrollController);

  // crowdsourcing headline
  let crowdsourcingHeadlineTween = new TweenMax.from('#crowdsourcing > #crowdsourcing-header', 1, {opacity: 0, top: -10, ease: Back.easeInOut});
  new ScrollMagic.Scene({triggerElement: '#crowdsourcing', offset: -100})
    .setTween(crowdsourcingHeadlineTween)
    .reverse(false)
    .addTo(scrollController);

  // crowdsourcing text
  let crowdsourcingTextTween = new TweenMax.from('#crowdsourcing > #crowdsourcing-text', 1, {opacity: 0, top: -10, ease: Back.easeInOut, delay: .3});
  new ScrollMagic.Scene({triggerElement: '#crowdsourcing', offset: -100})
    .setTween(crowdsourcingTextTween)
    .reverse(false)
    .addTo(scrollController);

  // crowdsourcing items
  let crowdsourcingTween = new TweenMax.staggerFrom('#crowdsourcing .topic', 1, {opacity: 0, top: -50, ease: Back.easeInOut, delay: .3}, .05);
  new ScrollMagic.Scene({triggerElement: '#crowdsourcing', offset: -100})
    .setTween(crowdsourcingTween)
    .reverse(false)
    .addTo(scrollController);

  // trigger rewards animation
  new ScrollMagic.Scene({triggerElement: '#rewards', offset: -200})
    .reverse(false)
    .on('start', function () {
      app.getRewards();
      setInterval(app.getRewards, 30000);
    })
    .addTo(scrollController);

  // steem logo
  let steemTween = new TweenMax.from('#steem-logo-container', 1.5, {opacity: 0, bottom: -50, ease: Power2.easeInOut,}, .05);
  new ScrollMagic.Scene({triggerElement: '#steem'})
    .setTween(steemTween)
    .reverse(false)
    .addTo(scrollController);

  // generate upvotes on steem logo...
  for (let i = 0; i < 6; i++){
    let bubble = document.createElement('i');
    TweenLite.set(bubble, {attr: {class: 'fa fa-angle-up upvote'}, left: randomNumberBetween(0, 100) + '%', bottom: randomNumberBetween(0, 100) + '%', scale: randomNumberBetween(.5, 2)});
    $('#steem-logo-container').append(bubble);
  }

  // ...and animate them
  let upvotesTimeline = new TimelineMax({repeat: -1});
  upvotesTimeline
    .staggerFrom('.upvote', .5, {scale: 0, opacity: 0, ease: Back.easeOut.config(4)}, 1)
    .staggerTo('.upvote', 2, {bottom: "+=25", opacity: 0, ease: Power1.easeInOut}, 1, '-=5');

  // blog
  steemitWidgets.blog({
    element: 'utopian-steemit-blog',
    user: 'utopian-io',
    limit: 10,
    template: 'blog-template',
    dateCallback: function (date) {return moment.utc(date).from(moment.utc().format('YYYY-MM-DD HH:mm:ss'));}
  });
});

function randomNumberBetween(min,max) {
  return min + Math.random() * (max-min)
}

let app = new Vue({
  el: '#app',
  data: {
    lang: 'en',
    messages: {},
    projects: [
      {
        name: 'Steemit.com',
        teaser: 'The social application web front-end to the Steem Blockchain',
        image: 'https://res.cloudinary.com/hpiynhbhq/image/upload/v1510152641/y4aytinzid1rnqrtlgyy.png',
        url: "https://utopian.io/project/steemit/condenser/github/59213335/all",
        github: {
          id: '59213335',
          url: 'https://github.com/steemit/condenser'
        },
        contributions: {}
      },
      {
        name: 'Busy.org',
        teaser: 'Blockchain-based social network where anyone can earn rewards',
        image: 'https://res.cloudinary.com/hpiynhbhq/image/upload/v1510052188/occhlvtqan2qafwhikbv.png',
        url: "https://utopian.io/project/busyorg/busy/github/64382195/all",
        github: {
          id: '64382195',
          url: 'https://github.com/busyorg/busy'
        },
        contributions: {}
      },
      {
        name: 'Utopian.io',
        teaser: 'Open Source Economy powered by the Steem blockchain',
        image: 'https://res.cloudinary.com/hpiynhbhq/image/upload/v1510150908/xx4shp2yiekby5d6sify.png',
        url: "https://utopian.io/project/utopian-io/utopian.io/github/104593314/all",
        github: {
          id: '104593314',
          url: 'https://github.com/utopian-io/utopian.io'
        },
        contributions: {}
      },
      {
        name: 'Wordpress',
        teaser: 'Most popular blogging platform and content management system.',
        image: 'https://res.cloudinary.com/hpiynhbhq/image/upload/v1510151319/fgsq6dznr52ztmbxmxad.png',
        url: "https://utopian.io/project/WordPress/WordPress/github/2889328/all",
        github: {
          id: '2889328',
          url: 'https://github.com/wordpress/wordpress'
        },
        contributions: {}
      },
      {
        name: 'D.Tube',
        teaser: 'Blockchain-based social video platform where anyone can earn rewards',
        image: 'https://res.cloudinary.com/hpiynhbhq/image/upload/v1510152015/a9dly7pdcwfgj4dr885n.png',
        url: "https://utopian.io/project/dtube/production/github/106749740/all",
        github: {
          id: '106749740',
          url: 'https://github.com/dtube/production'
        },
        contributions: {}
      },
      {
        name: 'eSteem',
        teaser: 'Native Android and iOS mobile application for Steem',
        image: 'https://res.cloudinary.com/hpiynhbhq/image/upload/v1510152218/lyim8tnecy9fsgn2gnvw.png',
        url: "https://utopian.io/project/eSteemApp/esteem/github/63218416/all",
        github: {
          id: '63218416',
          url: 'https://github.com/eSteemApp/esteem'
        },
        contributions: {}
      }
    ],
    rewards: {
      authors: 0,
      curators: 0,
      pending: 0,
      total: 0,
      moderators: {
        pending: 0,
        previous: 0
      }
    },
    moderators: []
  },
  created: function () {
    this.getMessages(this.lang);
    this.getProjects();
    this.getModerators();
  },
  methods: {
    getMessages: function (lang) {
      $.getJSON('translations/' + lang + '.json', (messages) => {
        this.messages = messages;
        this.lang = lang;
      });
    },
    trans: function (id) {
      let path = id.replace('messages.', '').split('.');
      if (path.length && this.messages.hasOwnProperty(path[0])) {
        let message = this.messages[path[0]];
        for (let i = 1; i < path.length; i++) {
          if (typeof message === 'object' && message.hasOwnProperty([path[i]])) {
            message = message[path[i]];
          }
        }
        return message;
      }
    },
    getProjects: function () {
      // currently only fetches the contributions
      for (let i = 0; i < this.projects.length; i++) {
        $.ajax({
          url: 'https://api.utopian.io/api/posts/?limit=5&section=project&sortBy=votes&platform=github&projectId=' + this.projects[i].github.id,
          success: (data) => {
            this.projects[i].contributions = data.results;
          },
        });
      }
    },
    getRewards: function () {
      $.ajax({
        url: 'https://api.utopian.io/api/stats',
        success: (data) => {
          let that = this;
          $({
            authors: this.rewards.authors,
            curators: this.rewards.curators,
            pending: this.rewards.pending,
            total: this.rewards.total,
          }).animate({
            authors: parseInt(data['stats']['total_paid_authors']),
            curators: parseInt(data['stats']['total_paid_curators']),
            pending: parseInt(data['stats']['total_pending_rewards']),
            total: parseInt(data['stats']['total_paid_rewards'] + data['stats']['total_pending_rewards']),
          }, {
            duration: 5000,
            step: function() {
              that.rewards.authors = this.authors;
              that.rewards.curators = this.curators;
              that.rewards.pending = this.pending;
              that.rewards.total = this.total;
            }
          });
        },
      });
    },
    getModerators: function () {
      $.ajax({
        url: 'https://api.utopian.io/api/moderators',
        success: (data) => {
          this.moderators = data.results;
          for (let i = 0; i < this.moderators.length; i++) {
            this.rewards.moderators.pending += this.moderators[i].should_receive_rewards;
            this.rewards.moderators.previous += this.moderators[i].total_paid_rewards;
          }
        },
      });
    }
  },
  filters: {
    currency: function (number) {
      return number.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    },
    payout: function(post) {
      if (post.last_payout === '1970-01-01T00:00:00') {
        let payout = post.pending_payout_value.replace(' SBD', '');
        return parseFloat(payout);
      }

      let authorPayout = post.total_payout_value.replace(' SBD', '');
      let curatorPayout = post.curator_payout_value.replace(' SBD', '');

      return (parseFloat(authorPayout) + parseFloat(curatorPayout)).toFixed(2);
    }
  }
});