WIP.

Please come back later...

## Exemple 

```js
@ViewChild('screen', { static: true }) screen: any;

... 

this.captureService.getImage(this.screen.nativeElement, true).then(img => {
  console.log(img);
});
```
