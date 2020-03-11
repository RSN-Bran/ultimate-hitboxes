import React from "react"

import '../css/HitBoxDetail.css';
import '../css/CharacterList.css';

function HitBoxDetail(props) {
  
  if (props.hitboxData === undefined) { return null; }
  else {
    console.log("her")
    return (
      <div id="hitboxDetail">
        <div id="exit" onClick={props.updateHitboxData.bind(this, undefined)}>
          X
				</div>

        <p>part: {props.hitboxData.part}                          </p>
        <p>bone: {props.hitboxData.bone}                          </p>
        <p>damage: {props.hitboxData.damage}                      </p>
        <p>angle: {props.hitboxData.angle}                        </p>
        <p>kbg: {props.hitboxData.kbg}                            </p>
        <p>fkb: {props.hitboxData.fkb}                            </p>
        <p>bkb: {props.hitboxData.bkb}                            </p>
        <p>size: {props.hitboxData.size}                          </p>
        <p>x: {props.hitboxData.x}                                </p>
        <p>y: {props.hitboxData.y}                                </p>
        <p>z: {props.hitboxData.z}                                </p>
        <p>hitlag: {props.hitboxData.hitlag}                      </p>
        <p>sdi: {props.hitboxData.sdi}                            </p>
        <p>clang_rebound: {props.hitboxData.clang_rebound}        </p>
        <p>facingrestrict: {props.hitboxData.facingrestrict}      </p>
        <p>setweight: {props.hitboxData.setweight}                </p>
        <p>shielddamage: {props.hitboxData.shielddamage}          </p>
        <p>trip: {props.hitboxData.trip}                          </p>
        <p>rehit: {props.hitboxData.rehit}                        </p>
        <p>reflectable: {props.hitboxData.reflectable}            </p>
        <p>absorbable: {props.hitboxData.absorbable}              </p>
        <p>flinchless: {props.hitboxData.flinchless}              </p>
        <p>disablehitlag: {props.hitboxData.disablehitlag}        </p>
        <p>direct_indirect: {props.hitboxData.direct_indirect}    </p>
        <p>ground_air: {props.hitboxData.ground_air}              </p>
        <p>hitbits: {props.hitboxData.hitbits}                    </p>
        <p>collisionpart: {props.hitboxData.collisionpart}        </p>
        <p>friendlyfire: {props.hitboxData.friendlyfire}          </p>
        <p>effect: {props.hitboxData.effect}                      </p>
        <p>sfxlevel: {props.hitboxData.sfxlevel}                  </p>
        <p>sfxtype: {props.hitboxData.sfxtype}                    </p>
        <p>type: {props.hitboxData.type}                          </p>
      </div>
    )
  }

}

export default HitBoxDetail