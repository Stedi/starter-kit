# JEDI 850 -> Orders API

## Summary

This Mapping shows how a `JEDI 850 Purchase Order` can be mapped to a fictional `orders` API shape.

More detail about how this Mapping was created can be found in the blog post [EDI for developers: turn EDI into JSON](https://www.stedi.com/blog/edi-for-developers-turn-edi-into-json).

1. **Source JSON:** 004010 JEDI 850 Purchase Order ([link](https://edi.stedi.com/inspector?value=ISA*00*++++++++++*00*++++++++++*ZZ*AMAZONDS+++++++*01*TESTID+++++++++*070808*1310*U*00401*000000043*1*T*%2B%7E%0AGS*PO*ATFDS*AMAZONDS*20070911*2001*95*X*004010%7E%0AST*850*0010%7E%0ABEG*00*DS*TesT0008596**20070808%7E%0ACUR*BT*USD%7E%0AREF*OQ*X%7E%0AREF*ST*1%7E%0AN9*ZZ*01%7E%0AMSG*This+shipment+completes+your+order.%7E%0AN9*ZZ*06%7E%0AMSG*For+detailed+information+about+your+orders%2C+please+visit+Your+Account.+You+can+also+print+invoices%2C%0Achange+your+e-mail+address+and+payment+settings%2C+alter+your+communication+preferences%2C+and+much+more-24%0Ahours+a+day-athttp%3A%2F%2Fwww.amazon.com%2Fyour-account.%7E%0AN9*ZZ*07%7E%0AMSG*Visit+http%3A%2F%2Fwww.amazon.com%2Freturns+to+return+any+item-including+gifts-in+unopened+or+original+condition%0Awithin+30+days+for+a+full+refund%28other+restrictions+apply%29.+Please+have+your+order+ID+ready.+Thanks+for%0Ashopping+at+Amazon.com%2C+and+please+come+again%21%7E%0AN1*BT*Amazon.com.kyde..Inc-*92*KYDC%7E%0AN1*SF*WHSE*92*WHSE%7E%0AN1*ST*Charlie+Dinkins%7E%0AN2*Darla+Dinkins%7E%0AN3*11254+Main+St*Suite+112%7E%0AN4*Seattle*WA*98104*US*CC*United+States%7E%0ATD5**92*UPS_GR_RES****ZZ*RES%7E%0AN1*LW*Amber+Baker%7E%0AN3*123+Anderson+Avenue%7E%0AN4*Seattle*WA*98103*US%7E%0APER*ZZ****TE*206-555-1212%7E%0APO1*1*3*EA*18.04*NT*SK*1617*****BL*1*ZZ*Amazon.com%7E%0ACTP**PUR*19.99%7E%0AMSG*Wide+Tracker+Activity+Walker%7E%0APO1*2*2*EA*54.42*NT*SK*4927*****BL*1*ZZ*Amazon.com%7E%0ACTP**PUR*59.99%7E%0AMSG*Deluxe+Cozy+Convertible%7E%0APO1*3*1*EA*21.9*NT*SK*1682*****BL*1*ZZ*Amazon.com%7E%0ACTP**PUR*25.99%7E%0AMSG*DiscoverSounds+Workshop%7E%0ACTT*6*43%7E%0ASE*33*0010%7E%0AGE*1*43%7E%0AIEA*1*000000043%7E&view=json)).
2. **Target JSON:** Fictional Orders API ([link](https://www.stedi.com/blog/edi-for-developers-turn-edi-into-json#part-i-working-backwards-from-your-api)).

## Deploy this Mapping to your Stedi account

Once you have created a [Stedi account](https://terminal.stedi.com/sign-up?email=), you can deploy this Mapping by clicking on the button below:

[![Run on Stedi](./../RunOnStedi.svg)](https://terminal.stedi.com/mappings/import?mapping=https://raw.githubusercontent.com/Stedi/api-starter-pack/main/mappings-examples/jedi-850-to-orders-api/mapping.json&source_json=https://raw.githubusercontent.com/Stedi/api-starter-pack/main/mappings-examples/jedi-850-to-orders-api/jedi.json&target_json=https://raw.githubusercontent.com/Stedi/api-starter-pack/main/mappings-examples/jedi-850-to-orders-api/orders-api.json&referrer=starter-kit)
