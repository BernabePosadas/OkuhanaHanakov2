import { injectable } from "inversify";

@injectable()
export class Quiver{
    public _bernabe_arrows : Array<string> = [];
    public _mark_arrows : Array<string> = [];
    public _ivan_arrows : Array<string> = [];
    constructor(){ 
         this.loadTheArrows();
    }
    private loadTheArrows(){
        // Bernabe
        var candidates : Array<string> = [
            "futaba_anzu",
            "crescent_(azur_lane)",
            "kohaku_(rune_factory)",
            "dolce_(rune_factory)",
            "kuko_(flower_knight_girl)",
            "heliotrope_(flower_knight_girl)",
            "flandre_scarlet",
            "nepgear"
        ];
        var probabilities : Array<number> = [
            112, // 56 % of 200 collections 
            4, // 2 %
            4, // 2 % 
            4, // 2 %
            4, // 2 %
            4, // 2 %
            41, // 20.5 %
            27 // 13.5 %
        ];
        this._bernabe_arrows = this.produceArrows(candidates, probabilities);

        // Mark
        candidates = [
            "abigail_williams_(fate/grand_order)",
            "kokkoro_(princess_connect!) "
        ];
        probabilities = [
            6, // 60 % of 10 collections 
            4 // 40%  
        ];
        this._mark_arrows = this.produceArrows(candidates, probabilities);

        // Ivan 
        candidates = [
            "lavender_(flower_knight_girl)",
            "hagi_(flower_knight_girl)",
            "kinrenka_(flower_knight_girl)",
            "enokorogusa_(flower_knight_girl)",
            "jack_the_ripper_(fate/apocrypha)",
            "nursery_rhyme_(fate/extra)",
            "megumin",
            "helena_blavatsky_(fate/grand_order)"
        ];
        probabilities = [
            2, // 10 % of 20 collections 
            1, // 5%
            1, // 5%
            1, // 5%
            6, // 30%
            3, // 15%
            4, // 20%
            2, // 10%
        ];
        this._ivan_arrows = this.produceArrows(candidates, probabilities);
    
    }
    private produceArrows(candidates : Array<string>, probabilities : Array<number>) : Array<string> {
        var deck : Array<string> = [];
        candidates.forEach(function(value : string, index : number) {
            var count : number = probabilities[index];
            while (count != 0) {
                deck.push(value);
                count--;
            }
        });
        return deck;
    }
    public pickAnArrow(person_to_shoot : string){
        switch(person_to_shoot){
            case "bernabe": 
                
            case "mark" :
            case "ivan" : 
            default :
                throw new Error("there is no task for person_to_shoot case : " + person_to_shoot);
        }
    }
}