import test from 'node:test';
import assert from 'node:assert/strict';
import {
    PACKET_TYPES,
    PREAMBLE,
    crc8,
    encodePackets,
    decodePacket,
    PacketReassembler
} from '../src/protocol.js';

test('CRC8 Calculation', () => {
    const data = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
    const c1 = crc8(data);
    assert.strictEqual(typeof c1, 'number');
    assert.ok(c1 >= 0 && c1 <= 255);

    // Identity check
    const c2 = crc8(data);
    assert.strictEqual(c1, c2);

    // Modification changes CRC
    const modified = new Uint8Array([0x01, 0x02, 0x03, 0x05]);
    assert.notStrictEqual(crc8(modified), c1);
});

test('Text Packet Encoding & Decoding', () => {
    const originalText = "Bonjour le monde ! Ceci est un transfert WaveDrop via son ou lumière 📡🔊";
    const packets = encodePackets(originalText, PACKET_TYPES.TEXT, {}, 16);

    assert.ok(packets.length > 1, 'Should create multiple packets with chunk size 16');

    const reassembler = new PacketReassembler();
    let finalResult = null;

    for (const pktBytes of packets) {
        const decoded = decodePacket(pktBytes);
        assert.ok(decoded !== null, 'Packet must decode successfully');
        assert.strictEqual(decoded.type, PACKET_TYPES.TEXT);
        const res = reassembler.addPacket(decoded);
        if (res.isComplete) {
            finalResult = res;
        }
    }

    assert.ok(finalResult !== null, 'Reassembler should mark transmission as complete');
    assert.strictEqual(finalResult.isComplete, true);
    assert.strictEqual(finalResult.text, originalText);
});

test('Image / Binary Packet with Metadata', () => {
    // Generate dummy image payload (100 bytes)
    const dummyImage = new Uint8Array(100);
    for (let i = 0; i < 100; i++) dummyImage[i] = (i * 7) % 256;

    const meta = { name: 'test_photo.png', mimeType: 'image/png' };
    const packets = encodePackets(dummyImage, PACKET_TYPES.IMAGE, meta, 24);

    const reassembler = new PacketReassembler();
    let finalResult = null;

    for (const pkt of packets) {
        const decoded = decodePacket(pkt);
        assert.ok(decoded !== null);
        const res = reassembler.addPacket(decoded);
        if (res.isComplete) {
            finalResult = res;
        }
    }

    assert.ok(finalResult !== null);
    assert.strictEqual(finalResult.type, PACKET_TYPES.IMAGE);
    assert.strictEqual(finalResult.metadata.name, 'test_photo.png');
    assert.strictEqual(finalResult.metadata.mimeType, 'image/png');
    assert.strictEqual(finalResult.bytes.length, 100);
    assert.deepStrictEqual(finalResult.bytes, dummyImage);
    assert.ok(finalResult.dataUrl.startsWith('data:image/png;base64,'));
});

test('Corrupted Packet Rejection via CRC', () => {
    const packets = encodePackets("Secret Data", PACKET_TYPES.TEXT, {}, 32);
    assert.strictEqual(packets.length, 1);

    const corrupted = new Uint8Array(packets[0]);
    // Corrupt one payload byte
    corrupted[9] ^= 0xFF;

    const decoded = decodePacket(corrupted);
    assert.strictEqual(decoded, null, 'Corrupted packet must be rejected');
});
