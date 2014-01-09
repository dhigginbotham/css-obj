var css = require('..');
var expect = require('expect.js');
var path = require('path');

describe('css parser', function () {
  
  it('should take a css file and turn it into an object', function (done) {

    var file = path.join(__dirname, 'style.css');

    css(file, function (err, data) {

      expect(err).to.be(null);
      expect(data).to.be.an(Object);
      
      expect(data['className'].background).to.eql('red');
      expect(data['className'].color).to.eql('#444000');
      expect(data['className'].border).to.eql('1px solid #B4DA55');
      
      expect(data['idName'].background).to.eql('red');
      expect(data['idName'].color).to.eql('#444000');
      expect(data['idName'].border).to.eql('1px solid #B4DA55');
      
      expect(data['elementName'].background).to.eql('red');
      expect(data['elementName'].color).to.eql('#444000');
      expect(data['elementName'].border).to.eql('1px solid #B4DA55');
      
      expect(data['class-name'].background).to.eql('red');
      expect(data['class-name'].color).to.eql('#444000');
      expect(data['class-name'].border).to.eql('1px solid #B4DA55');
      
      expect(data['id-name'].background).to.eql('red');
      expect(data['id-name'].color).to.eql('#444000');
      expect(data['id-name'].border).to.eql('1px solid #B4DA55');
      
      expect(data['ooclass'].background).to.eql('red');
      expect(data['ooclass'].color).to.eql('#444000');
      expect(data['ooclass'].border).to.eql('1px solid #B4DA55');
      
      expect(data['smcss'].background).to.eql('red');
      expect(data['smcss'].color).to.eql('#444000');
      expect(data['smcss'].border).to.eql('1px solid #B4DA55');

      return done();

    });


  });

});