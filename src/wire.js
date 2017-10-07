import Struct from 'struct';

/*
struct pusher_broadcast {
  uint8 mac[6];
  uint8 ip[4];
  uint8 deviceype;
  uint8 protocol;
  uint16 vid;
  uint16 pid;
  uint16 hardware_rev;
  uint16 software_rev;
  uint32 link_speed;
  uint8  strips_attached;
  uint8  max_strips_per_packet;
  uint16 pixels_per_strip;
  uint32 update_period;
  uint32 powerotal;
  uint32 delta_sequence;
  int32 controller_ordinal;
  int32 group_ordinal;
  uint16 artnet_universe;
  uint16 artnet_channel;
  uint16 my_port;
  uint16 padding1;
  uint8 strip_flags[8];
  uint16 padding2;
  uint32 pusher_flags;
  uint32 segments;
  uint32 power_domain;
  uint8 last_driven_ip[4];
  uint16 last_driven_port;
}
*/
export const DeviceType = {
    ETHERDREAM: 0,
    LUMIABRIDGE: 1,
    PIXELPUSHER: 2,
};

export function PusherBroadcast() {
    return (Struct()
        .array('mac', 6, 'word8')
        .array('ip', 4, 'word8')
        .word8('devicetype')
        .word8('protocol')
        .word16Ube('vid')
        .word16Ube('pid')
        .word16Ube('hardware_rev')
        .word16Ube('software_rev')
        .word32Ube('link_speed')
        .word8('strips_attached')
        .word8('max_strips_per_packet')
        .word16Ube('pixels_per_strip')
        .word32Ube('update_period')
        .word32Ube('powertotal')
        .word32Ube('delta_sequence')
        .word32Sbe('controller_ordinal')
        .word32Sbe('group_ordinal')
        .word16Ube('artnet_universe')
        .word16Ube('artnet_channel')
        .word16Ube('my_port')
    );
}

export default PusherBroadcast;

export function macString(broadcast) {
    return broadcast.mac.map((octet) => octet.toString(16)).join(':');
}

export function StripUpdate(num_pixels) {
    const update = Struct()
                     .word8('strip_id')
                     .array('pixel_data', 3*num_pixels, 'word8');

    return update;
}

export function StripPacket(num_strips, num_pixels) {
    const packet = Struct()
                     .word32Ube('sequence_no')
                     .array('strip_updates', num_strips, StripUpdate(num_pixels));

    return packet;
}
