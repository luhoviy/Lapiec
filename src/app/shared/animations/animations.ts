import {trigger,state,style,animate,transition,} from '@angular/animations';

export const onInitProcutsAnimate =
trigger('showItem', [
    state('shown', style({
      opacity: 1,
    })),
    state('hidden', style({
      opacity: 0,
      transform:('translateY(50px)'),
    })),
    state('hiddenLeft', style({
      opacity: 0,
      transform:('translateX(-100%)'),
    })),
    state('hiddenTop', style({
      opacity: 0,
      transform:('translateY(-100%)'),
    })),
    state('hiddenBottom', style({
      opacity: 0,
      transform:('translateY(100%)'),
    })),
    state('hiddenRight', style({
      opacity: 0,
      transform:('translateX(100%)'),
    })),
    transition('hiddenRight => shown', [
      animate('0.5s')
    ]),
    transition('hiddenBottom => shown', [
      animate('0.5s')
    ]),
    transition('hiddenTop => shown', [
      animate('0.7s')
    ]),
    transition('hiddenLeft => shown', [
      animate('0.3s')
    ]),
    transition('hidden => shown', [
      animate('0.3s')
    ]),
  ]);
export const onInitPromotionsAnimate =
trigger('showItem', [
    state('shown', style({
      opacity: 1,
    })),
    state('hiddenRight', style({
      opacity: 0,
      transform:('translateX(-100px)'),
    })),
    state('hiddenLeft', style({
      opacity: 0,
      transform:('translate(100px)'),
    })),
    transition('hiddenRight => shown', [
      animate('0.5s')
    ]),
    transition('hiddenLeft => shown', [
      animate('0.5s')
    ])
  ]);



export const onInitPaymentAnimate =
trigger('showItem', [
    state('shown', style({
      opacity: 1,
    })),
    state('title', style({
      opacity: 0,
      transform:('translateY(-50px)'),
    })),
    state('details', style({
      opacity: 0,
      transform:('translateY(150px)')
    })),
    state('29min', style({
      opacity: 0,
      transform:('translateX(-150px)'),
    })),
    state('59min', style({
      opacity: 0,
      transform:('translateX(-250px)'),
    })),
    state('yTitle', style({
      opacity: 0,
      transform:('translateY(150px)'),
    })),
    state('gTitle', style({
      opacity: 0,
      transform:('translateY(100px)'),
    })),
    state('gMinutes', style({
      opacity: 0,
      transform:('translateY(100px)'),
    })),
    state('yMinutes', style({
      opacity: 0,
      transform:('translateY(150px)'),
    })),
    state('gOrder', style({
      opacity: 0,
      transform:('translateY(150px)'),
    })),
    state('yOrder', style({
      opacity: 0,
      transform:('translateY(150px)'),
    })),
    state('gPrice', style({
      opacity: 0,
      transform:('translateY(150px)'),
    })),
    state('yPrice', style({
      opacity: 0,
      transform:('translateY(150px)'),
    })),
    state('map', style({
      opacity: 0,
      transform:('translateX(50px)')
    })),
    transition('title => shown', [
      animate('0.5s')
    ]),
    transition('details => shown', [
      animate('1.5s')
    ]),
    transition('29min => shown', [
      animate('0.5s')
    ]),
    transition('59min => shown', [
      animate('1.5s')
    ]),
    transition('gTitle => shown', [
      animate('0.3s')
    ]),
    transition('gMinutes => shown', [
      animate('0.5s')
    ]),
    transition('gOrder => shown', [
      animate('0.7s')
    ]),
    transition('gPrice => shown', [
      animate('1s')
    ]),
    transition('yTitle => shown', [
      animate('0.9s')
    ]),
    transition('yMinutes => shown', [
      animate('1.1s')
    ]),
    transition('yOrder => shown', [
      animate('1.3s')
    ]),
    transition('yPrice => shown', [
      animate('1.5s')
    ]),
    transition('map => shown', [
      animate('1.5s')
    ])
  ]);