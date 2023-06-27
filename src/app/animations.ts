import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';
export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ transform: 'translateY(130%)' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('1000ms ease-out', style({ transform: 'translateY(-130%)' }))
      ]),
      query(':enter', [
        animate('1000ms ease-out', style({ transform: 'translateY(0%)' }))
      ])
    ]),
    query(':enter', animateChild()),
  ])

  
    // transition('login => home', [
    //   style({ position: 'relative' }),
    //   query(':enter, :leave', [
    //     style({
    //       position: 'absolute',
    //       top: 0,
    //       right: 0,
    //       width: '100%'
    //     })
    //   ]),
    //   query(':enter', [
    //     style({ right: '-100%'})
    //   ]),
    //   query(':leave', animateChild()),
    //   group([
    //     query(':leave', [
    //       animate('1000ms ease-out', style({ right: '100%'}))
    //     ]),
    //     query(':enter', [
    //       animate('1000ms ease-out', style({ right: '0%'}))
    //     ])
    //   ]),
    //   query(':enter', animateChild()),
    // ])
  ]);