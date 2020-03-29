import assert from 'assert'

const bt1encoding = ["\n", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ".", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ".", " ", " ", " ", " ", " ", "!", "\"", "#", " ", " ", " ", "'", "(", ")", "*", "+", ",", "-", ".", " ", "O", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "", "]", "~", "_", "'", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "[", "*", "]", "_", "", ]
// const bt1encoding = ".                                                                            .                                                                             .     !\"#   '()*+,-. O123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[.]~_'abcdefghijklmnopqrstuvwxyz[*]_."
assert(bt1encoding[0xA1]=="!")
assert(bt1encoding[0xA3]=="#")
assert(bt1encoding[0xAE]==".")
assert(bt1encoding[0xB0]=="O")
assert(bt1encoding[0xB1]=="1")
assert(bt1encoding[0xC1]=="A")

function lookup(byte) {
    let num = parseInt(byte.substr(1,2), 16)
    return bt1encoding[num];
}

function processLine(line, outLines) {
    //bcc8:06ca:1   tbl-bcfe tablbcc8 .byte $04,$00,$00,$20,$10,$10
    //bcce:06d0:1                     .byte $10,$10,$03,$08,$05,$02
    const regex = /[0-9a-f]{4}:[0-9a-f]{4}:[0-9a-f]{1}.*\.byte (.*)/
    const match = line.match(regex)
    const last = outLines.length - 1
    if( match ) {
        const bytes = match[1]
        bytes.split(",").forEach( byte => outLines[last] += lookup(byte))
    }
    else if( outLines[last].length ) {
        outLines[last] = outLines[last].trim()
        if( outLines[last].length ) {
            outLines.push("")
        }
    }
}

const processText = text => {
    const outLines = [""];
    //const inLines = text.split("\r\n");
    const inLines = text.replace("\r\n", "\n").replace("\r", "\n").split("\n");
    // inLines.forEach( (line, index) => processLine(line, outLines) )
    for( let line of inLines ) {
        if( line.match(/garbage|unused/i) ) break
        processLine(line, outLines)
    }
    outLines.length--;
    return outLines
};

export default processText;




const testText = `
; Taverns event

*        =   $b600 ;  C64 


b600:0002:1   a2 02             ldx #$02              ; 2 + 50 = 52 ==> NM52
b602:0004:1   20 03 08          jsr $0803             ; load and display NM52
b605:0007:1   20 ec b7          jsr enterinn          ; find out what tavern and enter it
b608:000a:1   20 06 08 mainmenu jsr $0806             ; clear text window
b60b:000d:1   a0 b8             ldy #>txtmnu          ; get text ptr for main menu
b60d:000f:1   a2 2e             ldx #<txtmnu
b60f:0011:1   20 09 08          jsr $0809             ; print main menu
b612:0014:1   20 0f 08 mnukey   jsr $080f             ; wait for key
b615:0017:1   20 3f 08          jsr $083f             ; get key pressed
b618:001a:1   c9 cf             cmp #$cf              ; is "o"?
b61a:001c:1   f0 18             beq doorder           ; yes, handle the order
b61c:001e:1   c9 d4             cmp #$d4              ; is "t"?
b61e:0020:1   d0 03             bne ise               ; no, test for "e"
b620:0022:1   4c 38 b7          jmp dotalk            ; yes, handle talk to barkeep

b623:0025:1   c9 c5    ise      cmp #$c5              ; is "e"?
b625:0027:1   d0 eb             bne mnukey            ; on no try again to get a valid key
b627:0029:1   20 16 b8          jsr exitinn           ; on yes exit the inn
b62a:002c:1   a9 00             lda #$00              ; ????
b62c:002e:1   85 2f             sta $2f               ; ???? var needed in ae00?
b62e:0030:1   20 06 08          jsr $0806             ; clear text window
b631:0033:1   4c 00 ae          jmp $ae00             ; jump back into city handling

b634:0036:1   20 06 08 doorder  jsr $0806             ; clear text window
b637:0039:1   a0 ba             ldy #>txtwho          ; load ptr to text who will drink
b639:003b:1   a2 01             ldx #<txtwho
b63b:003d:1   20 09 08          jsr $0809             ; print who will drink
b63e:0040:1   20 96 08          jsr $0896             ; get ptr to char name choosen, or set carry if none
b641:0043:1   b0 c5             bcs mainmenu          ; if ESC back to main menu
b643:0045:1   84 0f             sty $0f               ; save ptr to char's roster entry
b645:0047:1   85 10             sta $10
b647:0049:1   a0 00             ldy #$00              ; index into char name
b649:004b:1   b1 0f             lda ($0f),y           ; get first char of char LOL
b64b:004d:1   f0 bb             beq mainmenu          ; is 0 if none choosen, back to main menu
b64d:004f:1   20 06 08          jsr $0806             ; clear text window
b650:0052:1   a0 b8             ldy #>txtseat         ; load text Seat thyself
b652:0054:1   a2 ab             ldx #<txtseat
b654:0056:1   20 09 08          jsr $0809             ; print text
b657:0059:1   a6 0f             ldx $0f               ; load char name
b659:005b:1   a4 10             ldy $10
b65b:005d:1   20 09 08          jsr $0809             ; print char name
b65e:0060:1   a0 b8             ldy #>txtdrink        ; load text We've got... and drink menu
b660:0062:1   a2 ba             ldx #<txtdrink
b662:0064:1   20 09 08          jsr $0809             ; print text
b665:0067:1   a9 05             lda #$05              ; set num of drinks to 5
b667:0069:1   8d 99 b6          sta cntdrink+1        ; self modifying for drink numbers
b66a:006c:1   a5 28             lda $28               ; get present N coor
b66c:006e:1   c9 05             cmp #$05              ; is N coor of Scarlet Bard?
b66e:0070:1   d0 10             bne nowine            ; no, so no wine to serve
b670:0072:1   a5 29             lda $29               ; get present E coor
b672:0074:1   c9 1c             cmp #$1c              ; is E coor of Scarlet Bard?
b674:0076:1   d0 0a             bne nowine            ; no, so no wine
b676:0078:1   a0 b8             ldy #>txtwine         ; here we have wine, N and E matches Scarlet Bard
b678:007a:1   a2 fa             ldx #<txtwine         ; load text (W)ine
b67a:007c:1   20 09 08          jsr $0809             ; print text
b67d:007f:1   ee 99 b6          inc cntdrink+1        ; with wine we have 6 drinks, so increase
b680:0082:1   a0 ba    nowine   ldy #>txtwhat         ; text What will it be?
b682:0084:1   a2 47             ldx #<txtwhat
b684:0086:1   20 09 08          jsr $0809             ; print text
b687:0089:1   20 0f 08          jsr $080f             ; wait for key
b68a:008c:1   20 3f 08          jsr $083f             ; get key pressed
b68d:008f:1   8d 6a ba          sta keyprssd          ; save key pressed
b690:0092:1   a2 00             ldx #$00              ; index counter for possible keys
b692:0094:1   dd 41 ba testkey  cmp vldkeys,x         ; this my drink?
b695:0097:1   f0 08             beq mykey             ; yes, handle it
b697:0099:1   e8                inx                   ; no, test next
b698:009a:1   e0 00    cntdrink cpx #$00
b69a:009c:1   90 f6             bcc testkey           ; go to test key
b69c:009e:1   4c 08 b6          jmp mainmenu          ; not a valid drink, back to main menu

b69f:00a1:1   86 dc    mykey    stx $dc               ; save position of found drink
b6a1:00a3:1   bd 3b ba          lda prices,x          ; load drink price
b6a4:00a6:1   a0 0b             ldy #$0b              ; store price of drink, errorneous!!!
b6a6:00a8:1   99 80 03          sta $0380,y
b6a9:00ab:1   a9 00             lda #$00
b6ab:00ad:1   99 80 03 lop1     sta $0380,y           ; overwrites price! Drinks really are FREE. This is a bug
b6ae:00b0:1   88                dey 
b6af:00b1:1   10 fa             bpl lop1
b6b1:00b3:1   a0 24             ldy #$24              ; point to gold in character roster
b6b3:00b5:1   20 60 08          jsr $0860             ; check if enough gold
b6b6:00b8:1   90 16             bcc canpay            ; if enough, go ahead
b6b8:00ba:1   a0 ba             ldy #>keyprssd        ; load pressed key char
b6ba:00bc:1   a2 6a             ldx #<keyprssd
b6bc:00be:1   20 09 08          jsr $0809             ; print key
b6bf:00c1:1   a0 a6    nogold   ldy #$a6              ; text Not enough Gold
b6c1:00c3:1   a2 b9             ldx #$b9
b6c3:00c5:1   20 09 08          jsr $0809             ; print text
b6c6:00c8:1   a9 08             lda #$08              ; Pause time 8 units
b6c8:00ca:1   20 57 08          jsr $0857             ; make a pause
b6cb:00cd:1   4c 08 b6          jmp mainmenu          ; back to main menu

b6ce:00d0:1   a0 ba    canpay   ldy #>keyprssd        ; load pressed key char
b6d0:00d2:1   a2 6a             ldx #<keyprssd
b6d2:00d4:1   20 09 08          jsr $0809             ; print key
b6d5:00d7:1   a0 24             ldy #$24              ; point to gold in character roster
b6d7:00d9:1   20 5d 08          jsr $085d             ; cash in the drink
b6da:00dc:1   a5 dc             lda $dc               ; load drink position
b6dc:00de:1   c9 03             cmp #$03              ; is foul spirits?
b6de:00e0:1   f0 12             beq spirits
b6e0:00e2:1   c9 04             cmp #$04              ; is Ginger Ale?
b6e2:00e4:1   f0 18             beq gingale
b6e4:00e6:1   c9 05             cmp #$05              ; is Wine?
b6e6:00e8:1   f0 23             beq cellar
b6e8:00ea:1   a0 b9             ldy #>txtburp         ; other drinks load message
b6ea:00ec:1   a2 a8             ldx #<txtburp         ; Not too bad
b6ec:00ee:1   20 09 08          jsr $0809             ; print text
b6ef:00f1:1   4c 20 b7          jmp chkbard

b6f2:00f4:1   a0 b9    spirits  ldy #>txtfeel         ; text no feel well
b6f4:00f6:1   a2 bd             ldx #<txtfeel
b6f6:00f8:1   20 09 08          jsr $0809             ; print text
b6f9:00fb:1   4c 20 b7          jmp chkbard           ; test if bard

b6fc:00fe:1   a0 b9    gingale  ldy #>txtgirl         ; girls will laugh about you
b6fe:0100:1   a2 d6             ldx #<txtgirl
b700:0102:1   20 09 08          jsr $0809             ; print text
b703:0105:1   a9 08             lda #$08              ; pause units
b705:0107:1   20 57 08          jsr $0857             ; make pause
b708:010a:1   4c 08 b6          jmp mainmenu          ; no bard songs for ginger ale!

b70b:010d:1   a0 b9    cellar   ldy #>txtpick         ; load text down to cellar
b70d:010f:1   a2 02             ldx #<txtpick
b70f:0111:1   20 09 08          jsr $0809             ; print text
b712:0114:1   a9 08             lda #$08              ; pause units
b714:0116:1   20 57 08          jsr $0857             ; make pause
b717:0119:1   a9 00             lda #$00              ; address level 0 = wine cellar
b719:011b:1   85 e0             sta $e0               ; store into var
b71b:011d:1   a9 01             lda #$01              ; address disk #1 = dungeon disk
b71d:011f:1   4c 90 08          jmp $0890             ; enter dungeon

b720:0122:1   a0 38    chkbard  ldy #$38              ; get byte 56 from present char
b722:0124:1   b1 0f             lda ($0f),y           ; load it from char
b724:0126:1   c9 06             cmp #$06              ; is it class 6 = Bard?
b726:0128:1   d0 08             bne drinkend          ; no, end drink
b728:012a:1   a0 23             ldy #$23              ; load lo-byte of current level of char
b72a:012c:1   b1 0f             lda ($0f),y           ; get it
b72c:012e:1   a0 49             ldy #$49              ; address remaining bard songs
b72e:0130:1   91 0f             sta ($0f),y           ; store level into remaining bard songs
b730:0132:1   a9 08    drinkend lda #$08              ; pause units
b732:0134:1   20 57 08          jsr $0857             ; make pause
b735:0137:1   4c 08 b6 exitordr jmp mainmenu

b738:013a:1   20 06 08 dotalk   jsr $0806             ; clear text window
b73b:013d:1   a0 ba             ldy #>txtwho2         ; load text talk to barkeep
b73d:013f:1   a2 17             ldx #<txtwho2
b73f:0141:1   20 09 08          jsr $0809             ; print text
b742:0144:1   20 96 08          jsr $0896             ; test for char key 1-6
b745:0147:1   b0 ee             bcs exitordr          ; no char key, back to main menu
b747:0149:1   84 0f             sty $0f               ; store found char's roster pointer
b749:014b:1   85 10             sta $10
b74b:014d:1   a0 00             ldy #$00              ; set roster index to name
b74d:014f:1   b1 0f             lda ($0f),y           ; test first char name char
b74f:0151:1   f0 e4             beq exitordr          ; if 0 there is no char
b751:0153:1   20 06 08          jsr $0806             ; clear text window
b754:0156:1   a0 b9             ldy #>txtcheap        ; load text talk ain't cheap
b756:0158:1   a2 43             ldx #<txtcheap
b758:015a:1   20 09 08          jsr $0809             ; print text
b75b:015d:1   20 1b 08          jsr $081b             ; get an input line
b75e:0160:1   b0 d5             bcs exitordr          ; on no input
b760:0162:1   e0 00             cpx #$00              ; test # of chars entered
b762:0164:1   f0 d1             beq exitordr          ; if empty input back to main menu
b764:0166:1   e0 04             cpx #$04              ; test if more than 999 gold
b766:0168:1   b0 cd             bcs exitordr          ; tip too big, back to main menu
b768:016a:1   ca                dex                   ; setup loop counter
b769:016b:1   a0 0b             ldy #$0b              ; pointer to price buffer
b76b:016d:1   bd 34 03 nextinp  lda $0334,x           ; get input char at x
b76e:0170:1   38                sec                   ; test numeric
b76f:0171:1   e9 b0             sbc #$b0
b771:0173:1   c9 0a             cmp #$0a
b773:0175:1   b0 c0             bcs exitordr          ; not a digit 0-9, back to menu
b775:0177:1   99 80 03          sta $0380,y           ; store in price buffer
b778:017a:1   88                dey                   ; next price digit
b779:017b:1   ca                dex                   ; next input char
b77a:017c:1   10 ef             bpl nextinp           ; handle next input char
b77c:017e:1   a9 00             lda #$00              ; zero not used price buffer
b77e:0180:1   99 80 03 zeroout  sta $0380,y
b781:0183:1   88                dey 
b782:0184:1   10 fa             bpl zeroout           ; more buffer to fill?
b784:0186:1   a0 24             ldy #$24              ; offset to chars gold
b786:0188:1   20 60 08          jsr $0860             ; test for gold
b789:018b:1   90 09             bcc hasgold           ; if nuff gold branch
b78b:018d:1   20 36 08          jsr $0836             ; linefeed
b78e:0190:1   20 36 08          jsr $0836             ; linefeed
b791:0193:1   4c bf b6          jmp nogold

b794:0196:1   a0 24    hasgold  ldy #$24              ; point to chars gold in his roster
b796:0198:1   20 5d 08          jsr $085d             ; cash in the tip
b799:019b:1   a0 00             ldy #$00              ; offset into price buffer
b79b:019d:1   a2 0b             ldx #$0b              ; digit position, how big is the sum?
b79d:019f:1   b9 80 03 nxtdgt   lda $0380,y           ; load price digit
b7a0:01a2:1   d0 15             bne not0              ; if not a 0, calc the sum
b7a2:01a4:1   ca                dex                   ; decrease digit position for amount
b7a3:01a5:1   c8                iny                   ; next price digit
b7a4:01a6:1   c0 0c             cpy #$0c              ; of course max 12 digits for gold
b7a6:01a8:1   90 f5             bcc nxtdgt            ; if some left, check next
b7a8:01aa:1   a0 b9             ldy #>txtmony         ; load text money talks
b7aa:01ac:1   a2 87             ldx #<txtmony
b7ac:01ae:1   20 09 08          jsr $0809             ; print text
b7af:01b1:1   a9 08             lda #$08              ; pause units
b7b1:01b3:1   20 57 08          jsr $0857             ; make pause
b7b4:01b6:1   4c 08 b6          jmp mainmenu

b7b7:01b9:1   48       not0     pha                   ; save register A
b7b8:01ba:1   8a                txa                   ; move price digit number to a
b7b9:01bb:1   0a                asl a                 ; times 2
b7ba:01bc:1   0a                asl a                 ; times 2
b7bb:01bd:1   aa                tax                   ; put a back to x
b7bc:01be:1   68                pla                   ; restore register A
b7bd:01bf:1   c9 05             cmp #$05              ; test for value of highest digit
b7bf:01c1:1   90 02             bcc goon              ; if less than 5
b7c1:01c3:1   e8                inx                   ; else add 2 to x
b7c2:01c4:1   e8                inx 
b7c3:01c5:1   8e cf b7 goon     stx addval+1          ; self-modify: store x value
b7c6:01c8:1   20 2a 08          jsr $082a             ; create two byte random number
b7c9:01cb:1   a5 5a             lda $5a               ; 5a and 5b set during prev subroutine
b7cb:01cd:1   29 03             and #$03              ; isolate low 3 bits
b7cd:01cf:1   18                clc 
b7ce:01d0:1   69 00    addval   adc #$00              ; add the modified x value
b7d0:01d2:1   0a                asl a                 ; again times 2
b7d1:01d3:1   aa                tax                   ; back into x
b7d2:01d4:1   bc 73 ba          ldy txthints+1,x      ; load text pointer from table
b7d5:01d7:1   bd 72 ba          lda txthints,x
b7d8:01da:1   aa                tax                   ; move text pointer to x for 0809
b7d9:01db:1   20 06 08          jsr $0806             ; clear text window
b7dc:01de:1   20 09 08          jsr $0809             ; print text
b7df:01e1:1   a0 ba             ldy #>txtkey          ; load text press a key
b7e1:01e3:1   a2 59             ldx #<txtkey
b7e3:01e5:1   20 09 08          jsr $0809             ; print text
b7e6:01e8:1   20 0f 08          jsr $080f             ; wait key pressed
b7e9:01eb:1   4c 08 b6          jmp mainmenu          ; back to main menu

b7ec:01ee:1   a2 00    enterinn ldx #$00              ; set cntr for tavern coordinates
b7ee:01f0:1   a5 28    tstcoors lda $28               ; load party's N coor
b7f0:01f2:1   dd 38 bc          cmp inncoors,x        ; matches tavern's N coor?
b7f3:01f5:1   d0 07             bne nextcoor          ; no, try next N coor
b7f5:01f7:1   a5 29             lda $29               ; load party's E coor
b7f7:01f9:1   dd 39 bc          cmp inncoors+1,x      ; matches tavern's E coor?
b7fa:01fc:1   f0 08             beq goin              ; yes, go inside
b7fc:01fe:1   e8       nextcoor inx                   ; prepare to load next N or E coor
b7fd:01ff:1   e8                inx 
b7fe:0200:1   e0 10             cpx #$10              ; all 8 pairs checked?
b800:0202:1   90 ec             bcc tstcoors          ; no, try next
b802:0204:1   a2 00             ldx #$00              ; all checked, no match, set default
b804:0206:1   bd 48 bc goin     lda ptrnames,x        ; get tavern name pointer
b807:0209:1   85 58             sta $58
b809:020b:1   bd 49 bc          lda ptrnames+1,x
b80c:020e:1   85 59             sta $59
b80e:0210:1   bd 58 bc          lda inndirs,x         ; load direction for tavern
b811:0213:1   85 24             sta $24
b813:0215:1   4c 0c 08          jmp $080c             ; continue with outtext, that code will rts

b816:0218:1   a5 24    exitinn  lda $24               ; get party's present direction
b818:021a:1   f0 0b             beq dirn              ; is 0 = N?
b81a:021c:1   c9 01             cmp #$01              ; is 1 = E?
b81c:021e:1   f0 0d             beq dire              ; on yes move east
b81e:0220:1   c9 02             cmp #$02              ; is 2 = S?
b820:0222:1   f0 06             beq dirs              ; on yes move south
b822:0224:1   c6 29    dirw     dec $29               ; must be 3 = W now, so move west
b824:0226:1   60                rts 

b825:0227:1   e6 28    dirn     inc $28
b827:0229:1   60                rts 

b828:022a:1   c6 28    dirs     dec $28
b82a:022c:1   60                rts 

b82b:022d:1   e6 29    dire     inc $29
b82d:022f:1   60                rts 

;
; text for main menu "Hail, travelers..."
;
b82e:0230:1   tbl-b8aa txtmnu   .byte $c8,$e1,$e9,$ec,$ac,$a0
b834:0236:1                     .byte $f4,$f2,$e1,$f6,$e5,$ec
b83a:023c:1                     .byte $e5,$f2,$f3,$a1,$a0,$d3
b840:0242:1                     .byte $f4,$e5,$f0,$a0,$f4,$ef
b846:0248:1                     .byte $a0,$f4,$e8,$e5,$a0,$e2
b84c:024e:1                     .byte $e1,$f2,$a0,$e1,$ee,$e4
b852:0254:1                     .byte $a0,$c9,$a7,$ec,$ec,$a0
b858:025a:1                     .byte $e4,$f2,$e1,$f7,$a0,$f9
b85e:0260:1                     .byte $ef,$f5,$a0,$e1,$a0,$f4
b864:0266:1                     .byte $e1,$ee,$eb,$e1,$f2,$e4
b86a:026c:1                     .byte $ae,$00,$00,$d9,$ef,$f5
b870:0272:1                     .byte $a0,$e3,$e1,$ee,$ba,$00
b876:0278:1                     .byte $00,$a8,$cf,$a9,$f2,$e4
b87c:027e:1                     .byte $e5,$f2,$a0,$e1,$a0,$e4
b882:0284:1                     .byte $f2,$e9,$ee,$eb,$00,$a8
b888:028a:1                     .byte $d4,$a9,$e1,$ec,$eb,$a0
b88e:0290:1                     .byte $f4,$ef,$a0,$e2,$e1,$f2
b894:0296:1                     .byte $eb,$e5,$e5,$f0,$00,$a8
b89a:029c:1                     .byte $c5,$a9,$f8,$e9,$f4,$a0
b8a0:02a2:1                     .byte $f4,$e8,$e5,$a0,$f4,$e1
b8a6:02a8:1                     .byte $f6,$e5,$f2,$ee,$ff

;
; text "Seat thyself, "
;
b8ab:02ad:1   tbl-b8b9 txtseat  .byte $d3,$e5,$e1,$f4,$a0,$f4
b8b1:02b3:1                     .byte $e8,$f9,$f3,$e5,$ec,$e6
b8b7:02b9:1                     .byte $ac,$00,$ff

;
; text ". We've got..." + drink menu w/o wine
;
b8ba:02bc:1   tbl-b8f9 txtdrink .byte $ae,$a0,$d7,$e5,$a7,$f6
b8c0:02c2:1                     .byte $e5,$a0,$e7,$ef,$f4,$ae
b8c6:02c8:1                     .byte $ae,$ae,$00,$00,$a8,$c1
b8cc:02ce:1                     .byte $a9,$ec,$e5,$00,$a8,$c2
b8d2:02d4:1                     .byte $a9,$e5,$e5,$f2,$00,$a8
b8d8:02da:1                     .byte $cd,$a9,$e5,$e1,$e4,$00
b8de:02e0:1                     .byte $a8,$c6,$a9,$ef,$f5,$ec
b8e4:02e6:1                     .byte $a0,$f3,$f0,$e9,$f2,$e9
b8ea:02ec:1                     .byte $f4,$f3,$00,$a8,$c7,$a9
b8f0:02f2:1                     .byte $e9,$ee,$e7,$e5,$f2,$a0
b8f6:02f8:1                     .byte $c1,$ec,$e5,$dc

;
; text "(W)ine"
;
b8fa:02fc:1   tbl-b901 txtwine  .byte $00,$a8,$d7,$a9,$e9,$ee
b900:0302:1                     .byte $e5,$dc

;
; text "The barkeep says..."
;
b902:0304:1   tbl-b942 txtpick  .byte $d4,$e8,$e5,$a0,$e2,$e1
b908:030a:1                     .byte $f2,$eb,$e5,$e5,$f0,$a0
b90e:0310:1                     .byte $f3,$e1,$f9,$f3,$ac,$a0
b914:0316:1                     .byte $a2,$c7,$ef,$a0,$e4,$ef
b91a:031c:1                     .byte $f7,$ee,$a0,$f4,$ef,$a0
b920:0322:1                     .byte $f4,$e8,$e5,$a0,$e3,$e5
b926:0328:1                     .byte $ec,$ec,$e1,$f2,$a0,$e1
b92c:032e:1                     .byte $ee,$e4,$a0,$f0,$e9,$e3
b932:0334:1                     .byte $eb,$a0,$ef,$f5,$f4,$a0
b938:033a:1                     .byte $e1,$a0,$e2,$ef,$f4,$f4
b93e:0340:1                     .byte $ec,$e5,$ae,$a2,$dc

;
; text "Talk ain't cheap..."
;
b943:0345:1   tbl-b986 txtcheap .byte $a2,$d4,$e1,$ec,$eb,$a0
b949:034b:1                     .byte $e1,$e9,$ee,$a7,$f4,$a0
b94f:0351:1                     .byte $e3,$e8,$e5,$e1,$f0,$ac
b955:0357:1                     .byte $a2,$a0,$f4,$e8,$e5,$a0
b95b:035d:1                     .byte $e2,$e1,$f2,$eb,$e5,$e5
b961:0363:1                     .byte $f0,$a0,$f3,$e1,$f9,$f3
b967:0369:1                     .byte $ae,$00,$00,$c8,$ef,$f7
b96d:036f:1                     .byte $a0,$ed,$f5,$e3,$e8,$a0
b973:0375:1                     .byte $f7,$e9,$ec,$ec,$a0,$f9
b979:037b:1                     .byte $ef,$f5,$a0,$f4,$e9,$f0
b97f:0381:1                     .byte $a0,$e8,$e9,$ed,$bf,$00
b985:0387:1                     .byte $00,$ff

;
; text "Money talks..."
;
b987:0389:1   tbl-b9a7 txtmony  .byte $00,$00,$a2,$cd,$ef,$ee
b98d:038f:1                     .byte $e5,$f9,$a0,$f4,$e1,$ec
b993:0395:1                     .byte $eb,$f3,$ac,$a0,$e2,$f5
b999:039b:1                     .byte $e4,$e4,$f9,$ac,$a2,$a0
b99f:03a1:1                     .byte $e8,$e5,$a0,$f3,$e1,$f9
b9a5:03a7:1                     .byte $f3,$ae,$dc

;
; text "(Burp!) Not too bad."
;
b9a8:03aa:1   tbl-b9bc txtburp  .byte $a8,$c2,$f5,$f2,$f0,$a1
b9ae:03b0:1                     .byte $a9,$a0,$ce,$ef,$f4,$a0
b9b4:03b6:1                     .byte $f4,$ef,$ef,$a0,$e2,$e1
b9ba:03bc:1                     .byte $e4,$ae,$dc

;
; text "You don't feel too well."
;
b9bd:03bf:1   tbl-b9d5 txtfeel  .byte $d9,$ef,$f5,$a0,$e4,$ef
b9c3:03c5:1                     .byte $ee,$a7,$f4,$a0,$e6,$e5
b9c9:03cb:1                     .byte $e5,$ec,$a0,$f4,$ef,$ef
b9cf:03d1:1                     .byte $a0,$f7,$e5,$ec,$ec,$ae
b9d5:03d7:1                     .byte $dc

;
; text "The girls in the tavern..."
;
b9d6:03d8:1   tbl-ba00 txtgirl  .byte $d4,$e8,$e5,$a0,$e7,$e9
b9dc:03de:1                     .byte $f2,$ec,$f3,$a0,$e9,$ee
b9e2:03e4:1                     .byte $a0,$f4,$e8,$e5,$a0,$f4
b9e8:03ea:1                     .byte $e1,$f6,$e5,$f2,$ee,$a0
b9ee:03f0:1                     .byte $e1,$f2,$e5,$a0,$ee,$ef
b9f4:03f6:1                     .byte $f4,$a0,$e9,$ed,$f0,$f2
b9fa:03fc:1                     .byte $e5,$f3,$f3,$e5,$e4,$ae
ba00:0402:1                     .byte $dc

;
; text "Who will drink [1-6]"
;
ba01:0403:1   tbl-ba16 txtwho   .byte $d7,$e8,$ef,$a0,$f7,$e9
ba07:0409:1                     .byte $ec,$ec,$a0,$e4,$f2,$e9
ba0d:040f:1                     .byte $ee,$eb,$bf,$a0,$db,$b1
ba13:0415:1                     .byte $ad,$b6,$dd,$dc

;
; text "Who will talk to..."
;
ba17:0419:1   tbl-ba3a txtwho2  .byte $d7,$e8,$ef,$a0,$f7,$e9
ba1d:041f:1                     .byte $ec,$ec,$a0,$f4,$e1,$ec
ba23:0425:1                     .byte $eb,$a0,$f4,$ef,$a0,$f4
ba29:042b:1                     .byte $e8,$e5,$a0,$e2,$e1,$f2
ba2f:0431:1                     .byte $eb,$e5,$e5,$f0,$bf,$a0
ba35:0437:1                     .byte $db,$b1,$ad,$b6,$dd,$dc

;
; price for the choosen drink
;
ba3b:043d:1   tbl-ba40 prices   .byte $03,$02,$04,$06,$01,$03

;
; Valid keys for drinks choosen
;
ba41:0443:1   tbl-ba46 vldkeys  .byte $c1,$c2,$cd,$c6,$c7,$d7

;
; text "What'll it be?"
;
ba47:0449:1   tbl-ba58 txtwhat  .byte $00,$00,$d7,$e8,$e1,$f4
ba4d:044f:1                     .byte $a7,$ec,$ec,$a0,$e9,$f4
ba53:0455:1                     .byte $a0,$e2,$e5,$bf,$a0,$dc

;
; text "Press a key..."
;
ba59:045b:1   tbl-ba69 txtkey   .byte $00,$00,$d0,$f2,$e5,$f3
ba5f:0461:1                     .byte $f3,$a0,$e1,$a0,$eb,$e5
ba65:0467:1                     .byte $f9,$ae,$ae,$ae,$dc

;
; stores the choosen drink
;
ba6a:046c:1   tbl-ba6a keyprssd .byte $a0

;
; garbage ???
;
ba6b:046d:1   tbl-ba71 tablba6b .byte $00,$00,$ff,$02,$03,$00
ba71:0473:1                     .byte $01

;
; pointers to hint texts, depending on tip
;
ba72:0474:1   tbl-ba99 txthints .word $ba9a
ba74:0476:1                     .word $ba9a
ba76:0478:1                     .word $bacd
ba78:047a:1                     .word $bacd
ba7a:047c:1                     .word $bb14
ba7c:047e:1                     .word $bb14
ba7e:0480:1                     .word $bb59
ba80:0482:1                     .word $bb59
ba82:0484:1                     .word $bbac
ba84:0486:1                     .word $bbac
ba86:0488:1                     .word $bbee
ba88:048a:1                     .word $bbee
ba8a:048c:1                     .word $bb59
ba8c:048e:1                     .word $bb59
ba8e:0490:1                     .word $bb59
ba90:0492:1                     .word $bb59
ba92:0494:1                     .word $bb59
ba94:0496:1                     .word $bb59
ba96:0498:1                     .word $bb59
ba98:049a:1                     .word $bb59

;
; text "The guardians..."
;
ba9a:049c:1   tbl-bacc hntguar  .byte $a2,$d4,$e8,$e5,$a0,$e7
baa0:04a2:1                     .byte $f5,$e1,$f2,$e4,$e9,$e1
baa6:04a8:1                     .byte $ee,$f3,$a0,$e3,$e1,$ee
baac:04ae:1                     .byte $a0,$e2,$e5,$a0,$e4,$e5
bab2:04b4:1                     .byte $e1,$e4,$ec,$f9,$ac,$a2
bab8:04ba:1                     .byte $a0,$f4,$e8,$e5,$a0,$e2
babe:04c0:1                     .byte $e1,$f2,$eb,$e5,$e5,$f0
bac4:04c6:1                     .byte $a0,$f3,$ed,$e9,$f2,$eb
baca:04cc:1                     .byte $f3,$ae,$dc

;
; text "A taste of wine..."
;
bacd:04cf:1   tbl-bb13 hntwine  .byte $a2,$c1,$a0,$f4,$e1,$f3
bad3:04d5:1                     .byte $f4,$e5,$a0,$ef,$e6,$a0
bad9:04db:1                     .byte $f7,$e9,$ee,$e5,$a0,$ed
badf:04e1:1                     .byte $e9,$e7,$e8,$f4,$a0,$f4
bae5:04e7:1                     .byte $f5,$f2,$ee,$a0,$f4,$ef
baeb:04ed:1                     .byte $a0,$f2,$e5,$e1,$e4,$f9
baf1:04f3:1                     .byte $a0,$e1,$e4,$f6,$e5,$ee
baf7:04f9:1                     .byte $f4,$f5,$f2,$e5,$ac,$a2
bafd:04ff:1                     .byte $a0,$f4,$e8,$e5,$a0,$e2
bb03:0505:1                     .byte $e1,$f2,$eb,$e5,$e5,$f0
bb09:050b:1                     .byte $a0,$e3,$e8,$f5,$e3,$eb
bb0f:0511:1                     .byte $ec,$e5,$f3,$ae,$dc

;
; text "Look for the Review Board..."
;
bb14:0516:1   tbl-bb58 hntrb    .byte $a2,$cc,$ef,$ef,$eb,$a0
bb1a:051c:1                     .byte $e6,$ef,$f2,$a0,$f4,$e8
bb20:0522:1                     .byte $e5,$a0,$d2,$e5,$f6,$e9
bb26:0528:1                     .byte $e5,$f7,$a0,$c2,$ef,$e1
bb2c:052e:1                     .byte $f2,$e4,$a0,$ef,$ee,$a0
bb32:0534:1                     .byte $d4,$f2,$f5,$ed,$f0,$e5
bb38:053a:1                     .byte $f4,$a0,$d3,$f4,$f2,$e5
bb3e:0540:1                     .byte $e5,$f4,$ac,$a2,$a0,$f4
bb44:0546:1                     .byte $e8,$e5,$a0,$e2,$e1,$f2
bb4a:054c:1                     .byte $eb,$e5,$e5,$f0,$a0,$f7
bb50:0552:1                     .byte $e8,$e9,$f3,$f0,$e5,$f2
bb56:0558:1                     .byte $f3,$ae,$dc

;
; text "The gates cannot be scaled..."
;
bb59:055b:1   tbl-bbab hntgate  .byte $a2,$d4,$e8,$e5,$a0,$e7
bb5f:0561:1                     .byte $e1,$f4,$e5,$f3,$a0,$e3
bb65:0567:1                     .byte $e1,$ee,$ee,$ef,$f4,$a0
bb6b:056d:1                     .byte $e2,$e5,$a0,$f3,$e3,$e1
bb71:0573:1                     .byte $ec,$e5,$e4,$ac,$a0,$e2
bb77:0579:1                     .byte $f5,$f4,$a0,$e1,$ee,$a0
bb7d:057f:1                     .byte $e5,$ee,$f4,$f2,$e1,$ee
bb83:0585:1                     .byte $e3,$e5,$a0,$e1,$ec,$f7
bb89:058b:1                     .byte $e1,$f9,$f3,$a0,$e5,$f8
bb8f:0591:1                     .byte $e9,$f3,$f4,$f3,$ac,$a2
bb95:0597:1                     .byte $a0,$f4,$e8,$e5,$a0,$e2
bb9b:059d:1                     .byte $e1,$f2,$eb,$e5,$e5,$f0
bba1:05a3:1                     .byte $a0,$f3,$f4,$f5,$f4,$f4
bba7:05a9:1                     .byte $e5,$f2,$f3,$ae,$dc

;
; text "The Stone Golem..."
;
bbac:05ae:1   tbl-bbed hntgolem .byte $a2,$d4,$e8,$e5,$a0,$d3
bbb2:05b4:1                     .byte $f4,$ef,$ee,$e5,$a0,$c7
bbb8:05ba:1                     .byte $ef,$ec,$e5,$ed,$a0,$e8
bbbe:05c0:1                     .byte $e1,$f3,$a0,$e2,$e5,$e5
bbc4:05c6:1                     .byte $ee,$a0,$f3,$f0,$ef,$eb
bbca:05cc:1                     .byte $e5,$ee,$a0,$ef,$e6,$a0
bbd0:05d2:1                     .byte $f4,$f7,$ef,$e6,$ef,$ec
bbd6:05d8:1                     .byte $e4,$ac,$a2,$a0,$f4,$e8
bbdc:05de:1                     .byte $e5,$a0,$e2,$e1,$f2,$eb
bbe2:05e4:1                     .byte $e5,$e5,$f0,$a0,$f3,$ed
bbe8:05ea:1                     .byte $e9,$ec,$e5,$f3,$ae,$dc

;
; text "The Spectre Snare..."
;
bbee:05f0:1   tbl-bc37 hntsnare .byte $a2,$d4,$e8,$e5,$a0,$d3
bbf4:05f6:1                     .byte $f0,$e5,$e3,$f4,$f2,$e5
bbfa:05fc:1                     .byte $a0,$d3,$ee,$e1,$f2,$e5
bc00:0602:1                     .byte $a0,$e3,$e1,$ee,$a0,$e4
bc06:0608:1                     .byte $f2,$e1,$f7,$a0,$e9,$ee
bc0c:060e:1                     .byte $a0,$e5,$f6,$e5,$ee,$a0
bc12:0614:1                     .byte $f4,$e8,$e5,$a0,$ed,$e9
bc18:061a:1                     .byte $e7,$e8,$f4,$e9,$e5,$f3
bc1e:0620:1                     .byte $f4,$ac,$a2,$a0,$f4,$e8
bc24:0626:1                     .byte $e5,$a0,$e2,$e1,$f2,$eb
bc2a:062c:1                     .byte $e5,$e5,$f0,$a0,$e7,$f2
bc30:0632:1                     .byte $f5,$ed,$e2,$ec,$e5,$f3
bc36:0638:1                     .byte $ae,$dc

;
; 8 pairs of tavern coors in Skara Brae map
;
bc38:063a:1   tbl-bc47 inncoors .byte $ff,$ff,$05,$1c,$13,$17
bc3e:0640:1                     .byte $07,$15,$06,$14,$01,$14
bc44:0646:1                     .byte $08,$01,$12,$0b

;
; 8 pointers to tavern names texts (down here)
;
bc48:064a:1   tbl-bc57 ptrnames .word $bc68
bc4a:064c:1                     .word $bc6f
bc4c:064e:1                     .word $bc7c
bc4e:0650:1                     .word $bc89
bc50:0652:1                     .word $bc96
bc52:0654:1                     .word $bca3
bc54:0656:1                     .word $bcb0
bc56:0658:1                     .word $bcbd

;
; directions for return from tavern into city
;
bc58:065a:1   tbl-bc67 inndirs  .byte $00,$00,$03,$00,$03,$00
bc5e:0660:1                     .byte $00,$00,$02,$00,$00,$00
bc64:0666:1                     .byte $02,$00,$03,$00

;
; name for unknown taverns "Tavern"
;
bc68:066a:1   tbl-bc6e namdef   .byte $d4,$e1,$f6,$e5,$f2,$ee
bc6e:0670:1                     .byte $dc

;
; name "Scarlet Bard"
;
bc6f:0671:1   tbl-bc7b namsb    .byte $d3,$e3,$e1,$f2,$ec,$e5
bc75:0677:1                     .byte $f4,$a0,$c2,$e1,$f2,$e4
bc7b:067d:1                     .byte $dc

;
; name "Sinister Inn"
;
bc7c:067e:1   tbl-bc88 namsi    .byte $d3,$e9,$ee,$e9,$f3,$f4
bc82:0684:1                     .byte $e5,$f2,$a0,$c9,$ee,$ee
bc88:068a:1                     .byte $dc

;
; name "Dragonbreath"
;
bc89:068b:1   tbl-bc95 namdrbr  .byte $c4,$f2,$e1,$e7,$ef,$ee
bc8f:0691:1                     .byte $e2,$f2,$e5,$e1,$f4,$e8
bc95:0697:1                     .byte $dc

;
; name "Ask Y'Mother"
;
bc96:0698:1   tbl-bca2 namaym   .byte $c1,$f3,$eb,$a0,$d9,$a7
bc9c:069e:1                     .byte $cd,$ef,$f4,$e8,$e5,$f2
bca2:06a4:1                     .byte $dc

;
; name "Archmage Inn"
;
bca3:06a5:1   tbl-bcaf namai    .byte $c1,$f2,$e3,$e8,$ed,$e1
bca9:06ab:1                     .byte $e7,$e5,$a0,$c9,$ee,$ee
bcaf:06b1:1                     .byte $dc

;
; name "Skull tavern"
;
bcb0:06b2:1   tbl-bcbc namst    .byte $d3,$eb,$f5,$ec,$ec,$a0
bcb6:06b8:1                     .byte $d4,$e1,$f6,$e5,$f2,$ee
bcbc:06be:1                     .byte $dc

;
; name "Drawnblade"
;
bcbd:06bf:1   tbl-bcc7 namdrbl  .byte $c4,$f2,$e1,$f7,$ee,$e2
bcc3:06c5:1                     .byte $ec,$e1,$e4,$e5,$dc

;
; garbage
;
bcc8:06ca:1   tbl-bcfe tablbcc8 .byte $04,$00,$00,$20,$10,$10
bcce:06d0:1                     .byte $10,$10,$03,$08,$05,$02
bcd4:06d6:1                     .byte $01,$00,$01,$00,$00,$00
bcda:06dc:1                     .byte $02,$00,$01,$03,$50,$00
bce0:06e2:1                     .byte $00,$01,$03,$00,$00,$00
bce6:06e8:1                     .byte $40,$00,$10,$10,$03,$30
bcec:06ee:1                     .byte $00,$00,$00,$00,$02,$01
bcf2:06f4:1                     .byte $01,$01,$00,$00,$18,$00
bcf8:06fa:1                     .byte $00,$00,$01,$01,$ff,$ff
bcfe:0700:1                     .byte $00

.end

`
export { testText }
