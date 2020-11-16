/*
3. Let's say you were a huge fan of Object Oriented Programming and the api
offered the option to get all the data you needed at once. What classes
would you make and what functions would they have?
(_TIP: You do not have to write out the implementation of the functions
  (but you can if it makes it easier to think it through)_)
(_TIP: If you are unsure between two decisions, then write a comment with the
  alternative you considered but decided against with arguments. There is again
  no one correct answer here, but we want to see you think in an OOP way_)
(_TIP: If you want the code highlighting, it is also fine to create a `.js` file
and then write down here what file to look at_)
*/
enum Species {
  human,
  dragon,
  giant,
  god
}

enum LivingStatus {
  alive,
  zombie,
  dead,
  whiteWalker
}

enum _Position {
  commoner,
  soldier,
  peasant,
  knight,
  maester,
  magician,
  lord,
  king
}

enum UnionType {
  kingdom,
  house,
  county,
  city,
  castle,
  village
}

interface Union {
  type: UnionType;
}

abstract class Universe {
  name: string;
  kingdoms: Kingdom[];
  citizens: Creature[];

  constructor(name: string) {
    this.name = name;
  }

  // it always happens that a kingdom has more than 1 king!
  get kings(): Creature[] {
    return this.getCreature(_Position.king);
  }
  get lords(): Creature[] {
    return this.getCreature(_Position.lord);
  }
  private getCreature(position: _Position): Creature[] {
    return this.citizens.filter(c => c.position === position);
  }
  protected find(some: Creature): boolean {
    return some.devotion.name === this.name;
  }
}

class Kingdom extends Universe implements Union {
  type = UnionType.kingdom;
  get kings(): Creature[] {
    return super.kings.filter(c => this.find(c));
  }
}

class House extends Kingdom implements Union {
  type = UnionType.house;
  get lords(): Creature[] {
    return super.lords.filter(c => this.find(c));
  }
}

class Creature {
  name: string;
  species: Species;
  livingStatus: LivingStatus;
  position: _Position;
  devotion: Universe;
  constructor(name: string) {
    this.name = name;
  }
  kill() {
    this.livingStatus = LivingStatus.dead;
  }
}

const north = new Kingdom('North');
const stark = new House('Stark');
north.kingdoms.push(stark);
const john = new Creature('John Snow');
john.livingStatus = LivingStatus.alive;
john.species = Species.human;
john.position = _Position.king
john.devotion = stark;

const south = new Kingdom('South');
const targar = new House('Targarien');
south.kingdoms.push(targar);
const girl = new Creature('Daenerys');
girl.species = Species.human;
girl.position = _Position.king;
girl.devotion = targar;

console.log(south.kings.join(', '));