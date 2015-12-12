import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel.util", function () {
    var mixin;

    beforeEach("setup", function ( done ) {
        var imports = [
            "nel/util"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                mixin = modules[ 0 ].mixin;
            })
            .then(done, done);
    });

    describe("#mixin()", function () {
        it("should make methods of all classes available", function () {
            class A {
                a() { return "A::a();"; }
                d() { return "A::d();"; }
                f() { return "A::f();"; }
            }
            class B {
                b() { return "B::b();"; }
                e() { return "B::e();"; }
                f() { return "B::f();"; }
            }
            class C extends A {
                c() { return "C::c();"; }
                d() { return "C::d();"; }
                e() { return "C::e();"; }
            }
            mixin(C, B);

            var instance = new C();
            expect(instance.a()).to.equal( "A::a();" );
            expect(instance.b()).to.equal( "B::b();" );
            expect(instance.c()).to.equal( "C::c();" );
            expect(instance.d()).to.equal( "C::d();" );
            expect(instance.e()).to.equal( "C::e();" );
            expect(instance.f()).to.equal( "A::f();" );
        });
    });
});
