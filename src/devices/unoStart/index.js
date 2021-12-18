const formatMessage = require('format-message');

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const ProgramModeType = require('../../extension-support/program-mode-type');

// const ArduinoPeripheral = require('../arduinoCommon/arduino-peripheral');
const ArduinoPeripheral = require('../arduinoCommon/unostart-peripheral');

/**
 * The list of USB device filters.
 * @readonly
 */
const PNPID_LIST = [
    // For chinese clones that use CH340
    'USB\\VID_1A86&PID_7523'
];

/**
 * Configuration of serialport
 * @readonly
 */
const SERIAL_CONFIG = {
    baudRate: 57600,
    dataBits: 8,
    stopBits: 1
};

/**
 * Configuration for arduino-cli.
 * @readonly
 */
const DIVECE_OPT = {
    type: 'arduino',
    fqbn: 'arduino:avr:uno',
    firmware: 'arduinoUno.standardFirmata.ino.hex'
};

const Pins = {
    D0: '0',
    D1: '1',
    D2: '2',
    D3: '3',
    D4: '4',
    D5: '5',
    D6: '6',
    D7: '7',
    D8: '8',
    D9: '9',
    D10: '10',
    D11: '11',
    D12: '12',
    D13: '13',
    A0: 'A0',
    A1: 'A1',
    A2: 'A2',
    A3: 'A3',
    A4: 'A4',
    A5: 'A5'
};


const Level = {
    High: 'HIGH',
    Low: 'LOW'
};

const Buadrate = {
    B4800: '4800',
    B9600: '9600',
    B19200: '19200',
    B38400: '38400',
    B57600: '57600',
    B76800: '76800',
    B115200: '115200'
};

const Eol = {
    Warp: 'warp',
    NoWarp: 'noWarp'
};

const Mode = {
    Input: 'INPUT',
    Output: 'OUTPUT',
    InputPullup: 'INPUT_PULLUP'
};

const InterrupMode = {
    Rising: 'RISING',
    Falling: 'FALLING',
    Change: 'CHANGE',
    Low: 'LOW'
};

const DataType = {
    Integer: 'INTEGER',
    Decimal: 'DECIMAL',
    String: 'STRING'
};

/**
 * Manage communication with a Arduino Uno peripheral over a OpenBlock Link client socket.
 */
class unoStart extends ArduinoPeripheral{
    /**
     * Construct a Arduino communication object.
     * @param {Runtime} runtime - the OpenBlock runtime
     * @param {string} deviceId - the id of the extension
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor (runtime, deviceId, originalDeviceId) {
        super(runtime, deviceId, originalDeviceId, PNPID_LIST, SERIAL_CONFIG, DIVECE_OPT);
    }
}

/**
 * OpenBlock blocks to interact with a Arduino Uno peripheral.
 */
class OpenBlockUnoStartDevice {
    /**
     * @return {string} - the ID of this extension.
     */
    static get DEVICE_ID () {
        return 'unoStart';
    }

    get PINS_MENU () {
        return [
            {
                text: '3',
                value: Pins.D3
            },
            {
                text: '5',
                value: Pins.D5
            },
            {
                text: '6',
                value: Pins.D6
            },
            {
                text: '9',
                value: Pins.D9
            },
            {
                text: 'A0',
                value: Pins.A0
            },
            {
                text: 'A1',
                value: Pins.A1
            },
            {
                text: 'A2',
                value: Pins.A2
            },
            {
                text: 'A3',
                value: Pins.A3
            }
        ];
    }

    get MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'arduinoUno.modeMenu.input',
                    default: 'input',
                    description: 'label for input pin mode'
                }),
                value: Mode.Input
            },
            {
                text: formatMessage({
                    id: 'arduinoUno.modeMenu.output',
                    default: 'output',
                    description: 'label for output pin mode'
                }),
                value: Mode.Output
            },
            {
                text: formatMessage({
                    id: 'arduinoUno.modeMenu.inputPullup',
                    default: 'input-pullup',
                    description: 'label for input-pullup pin mode'
                }),
                value: Mode.InputPullup
            }
        ];
    }

    get ANALOG_PINS_MENU () {
        return [
            {
                text: 'A0',
                value: Pins.A0
            },
            {
                text: 'A1',
                value: Pins.A1
            },
            {
                text: 'A2',
                value: Pins.A2
            },
            {
                text: 'A3',
                value: Pins.A3
            }
        ];
    }

    get LEVEL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'unoCore.levelMenu.high',
                    default: 'high',
                    description: 'label for high level'
                }),
                value: Level.High
            },
            {
                text: formatMessage({
                    id: 'unoCore.levelMenu.low',
                    default: 'low',
                    description: 'label for low level'
                }),
                value: Level.Low
            }
        ];
    }

    get PWM_PINS_MENU () {
        return [
            {
                text: '3',
                value: Pins.D3
            },
            {
                text: '5',
                value: Pins.D5
            },
            {
                text: '6',
                value: Pins.D6
            },
            {
                text: '9',
                value: Pins.D9
            }
        ];
    }

    get INTERRUPT_PINS_MENU () {
        return [
            {
                text: '3',
                value: Pins.D3
            }
        ];
    }

    get INTERRUP_MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'arduinoUno.InterrupModeMenu.risingEdge',
                    default: 'rising edge',
                    description: 'label for rising edge interrup'
                }),
                value: InterrupMode.Rising
            },
            {
                text: formatMessage({
                    id: 'arduinoUno.InterrupModeMenu.fallingEdge',
                    default: 'falling edge',
                    description: 'label for falling edge interrup'
                }),
                value: InterrupMode.Falling
            },
            {
                text: formatMessage({
                    id: 'arduinoUno.InterrupModeMenu.changeEdge',
                    default: 'change edge',
                    description: 'label for change edge interrup'
                }),
                value: InterrupMode.Change
            },
            {
                text: formatMessage({
                    id: 'unoStart.InterrupModeMenu.low',
                    default: 'low',
                    description: 'label for low interrup'
                }),
                value: InterrupMode.Low
            }
        ];
    }

    get BAUDTATE_MENU () {
        return [
            {
                text: '4800',
                value: Buadrate.B4800
            },
            {
                text: '9600',
                value: Buadrate.B9600
            },
            {
                text: '19200',
                value: Buadrate.B19200
            },
            {
                text: '38400',
                value: Buadrate.B38400
            },
            {
                text: '57600',
                value: Buadrate.B57600
            },
            {
                text: '76800',
                value: Buadrate.B76800
            },
            {
                text: '115200',
                value: Buadrate.B115200
            }
        ];
    }

    get EOL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'arduinoUno.eolMenu.warp',
                    default: 'warp',
                    description: 'label for warp print'
                }),
                value: Eol.Warp
            },
            {
                text: formatMessage({
                    id: 'arduinoUno.eolMenu.noWarp',
                    default: 'no-warp',
                    description: 'label for no warp print'
                }),
                value: Eol.NoWarp
            }
        ];
    }

    get DATA_TYPE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'arduinoUno.dataTypeMenu.integer',
                    default: 'integer',
                    description: 'label for integer'
                }),
                value: DataType.Integer
            },
            {
                text: formatMessage({
                    id: 'arduinoUno.dataTypeMenu.decimal',
                    default: 'decimal',
                    description: 'label for decimal number'
                }),
                value: DataType.Decimal
            },
            {
                text: formatMessage({
                    id: 'arduinoUno.dataTypeMenu.string',
                    default: 'string',
                    description: 'label for string'
                }),
                value: DataType.String
            }
        ];
    }

    get NUMTYPE_MENU (){
        return [
            {
                text: formatMessage({
                    id: 'unoCore.numtypeMenu.int',
                    default: 'int num',
                    description: 'read serial a int num'
                }),
                value: 'int'
            },
            {
                text: formatMessage({
                    id: 'unoCore.numtypeMenu.float',
                    default: 'float num',
                    description: 'read serial a float num'
                }),
                value: 'float'
            }
        ];
    }

    get PRINT_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'unoCore.printMenu.string',
                    default: 'string output',
                    description: 'label for string print'
                }),
                value: 'string'
            },
            {
                text: formatMessage({
                    id: 'unoCore.printMenu.original',
                    default: 'byte output',
                    description: 'label for byte print'
                }),
                value: 'original'
            },
            {
                text: formatMessage({
                    id: 'unoCore.printMenu.hex',
                    default: 'hex output',
                    description: 'label for hex print'
                }),
                value: 'hex'
            }
        ];
    }

    get DATA_TYPE_MENU_NOTSTR () {
        return [
            {
                text: formatMessage({
                    id: 'unoCore.dataTypeMenu.integer',
                    default: 'integer',
                    description: 'label for integer'
                }),
                value: DataType.Integer
            },
            {
                text: formatMessage({
                    id: 'unoCore.dataTypeMenu.decimal',
                    default: 'decimal',
                    description: 'label for decimal number'
                }),
                value: DataType.Decimal
            }
            // {
            //     text: formatMessage({
            //         id: 'unoCore.dataTypeMenu.string',
            //         default: 'string',
            //         description: 'label for string'
            //     }),
            //     value: DataType.String
            // }
        ];
    }

    /**
     * Construct a set of Arduino blocks.
     * @param {Runtime} runtime - the OpenBlock runtime.
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor (runtime, originalDeviceId) {
        /**
         * The OpenBlock runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // Create a new Arduino uno peripheral instance
        this._peripheral = new unoStart(this.runtime, OpenBlockUnoStartDevice.DEVICE_ID, originalDeviceId);
    }

    /**
     * @returns {Array.<object>} metadata for this extension and its blocks.
     */
    getInfo () {
        return [
            {
                id: 'pin',
                name: formatMessage({
                    id: 'arduinoUno.category.pins',
                    default: 'Pins',
                    description: 'The name of the arduino uno device pin category'
                }),
                color1: '#4C97FF',
                color2: '#3373CC',
                color3: '#3373CC',

                blocks: [
                    {
                        opcode: 'setUnoStartPinMode',
                        text: formatMessage({
                            id: 'arduinoUno.pins.setPinMode',
                            default: 'set pin [PIN] mode [MODE]',
                            description: 'unoStart set pin mode'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.D3
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'mode',
                                defaultValue: Mode.Input
                            }
                        }
                    },
                    {
                        opcode: 'setUnoStartDigitalOutput',
                        text: formatMessage({
                            id: 'arduinoUno.pins.setDigitalOutput',
                            default: 'set digital pin [PIN] out [LEVEL]',
                            description: 'unoStart set digital pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.D3
                            },
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: 'level',
                                defaultValue: Level.High
                            }
                        }
                    },
                    {
                        opcode: 'setUnoStartPwmOutput',
                        text: formatMessage({
                            id: 'unoCore.pins.setPwmOutput',
                            default: 'set pwm pin [PIN] out [OUT]',
                            description: 'unoStart set pwm pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pwmPins',
                                defaultValue: Pins.D3
                            },
                            OUT: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '255'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'readUnoStartDigitalPin',
                        text: formatMessage({
                            id: 'unoStart.pins.readDigitalPin',
                            default: 'read [PIN] is [LEVEL]',
                            description: 'unoStart read digital pin'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.A0
                            },
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: 'level',
                                defaultValue: Level.High
                            }
                        }
                    },
                    {
                        opcode: 'readUnoStartDigitalPinNum',
                        text: formatMessage({
                            id: 'unoStart.pins.readDigitalPinNum',
                            default: 'read digital pin [PIN]',
                            description: 'unoStart read digital pin'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.A0
                            }
                        }
                    },
                    {
                        opcode: 'readUnoStartAnalogPin',
                        text: formatMessage({
                            id: 'unoStart.pins.readAnalogPin',
                            default: 'read analog pin [PIN]',
                            description: 'unoStart read analog pin'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'analogPins',
                                defaultValue: Pins.A0
                            }
                        }
                    },

                    '---',
                    {

                        opcode: 'setUnoStartServoOutput',
                        text: formatMessage({
                            id: 'arduinoUno.pins.setServoOutput',
                            default: 'set servo pin [PIN] out [OUT]',
                            description: 'unoStart set servo pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pwmPins',
                                defaultValue: Pins.D3
                            },
                            OUT: {
                                type: ArgumentType.ANGLE,
                                defaultValue: '90'
                            }
                        }
                    },
                    '---',
                    {

                        opcode: 'unoStartAttachInterrupt',
                        text: formatMessage({
                            id: 'unoStart.pins.attachInterrupt',
                            default: 'attach interrupt pin 3 mode [MODE] executes',
                            description: 'unoStart attach interrupt'
                        }),
                        blockType: BlockType.CONDITIONAL,
                        arguments: {
                            // PIN: {
                            //     type: ArgumentType.STRING,
                            //     menu: 'interruptPins',
                            //     defaultValue: Pins.D3
                            // },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'interruptMode',
                                defaultValue: InterrupMode.Rising
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {

                        opcode: 'unoStartDetachInterrupt',
                        text: formatMessage({
                            id: 'unoStart.pins.detachInterrupt',
                            default: 'detach interrupt pin 3',
                            description: 'unoStart detach interrupt'
                        }),
                        blockType: BlockType.COMMAND,
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                menus: {
                    pins: {
                        items: this.PINS_MENU
                    },
                    mode: {
                        items: this.MODE_MENU
                    },
                    analogPins: {
                        items: this.ANALOG_PINS_MENU
                    },
                    level: {
                        acceptReporters: true,
                        items: this.LEVEL_MENU
                    },
                    pwmPins: {
                        items: this.PWM_PINS_MENU
                    },
                    interruptPins: {
                        items: this.INTERRUPT_PINS_MENU
                    },
                    interruptMode: {
                        items: this.INTERRUP_MODE_MENU
                    }
                }
            },  
            {
                id: 'serial',
                name: formatMessage({
                    id: 'arduinoUno.category.serial',
                    default: 'Serial',
                    description: 'The name of the unoCore device serial category'
                }),
                color1: '#9966FF',
                color2: '#774DCB',
                color3: '#774DCB',

                blocks: [
                    {
                        opcode: 'unoCoreSerialBegin',
                        text: formatMessage({
                            id: 'unoCore.serial.serialBegin',
                            default: 'serial begin baudrate [VALUE]',
                            description: 'unoCore serial begin'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            VALUE: {
                                type: ArgumentType.STRING,
                                menu: 'baudrate',
                                defaultValue: Buadrate.B9600
                                // defaultValue: Buadrate.B115200
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'unoCoreSerialPrint',
                        text: formatMessage({
                            id: 'unoCore.serial.serialPrint',
                            default: 'serial [TYPE] [VALUE] [EOL]',
                            description: 'unoCore serial print'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            TYPE: {
                                type: ArgumentType.STRING,
                                menu: 'print',
                                defaultValue: 'string'
                            },
                            VALUE: {
                                type: ArgumentType.STRING,
                                defaultValue: 'HelloWorld'
                            },
                            EOL: {
                                type: ArgumentType.STRING,
                                menu: 'eol',
                                defaultValue: Eol.Warp
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'unoCoreSerialAvailable',
                        text: formatMessage({
                            id: 'unoCore.serial.serialAvailable',
                            default: 'serial available data length',
                            description: 'unoCore serial available data length'
                        }),
                        blockType: BlockType.REPORTER,
                        disableMonitor: true,
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'unoCoreIsSerialAvailable',
                        text: formatMessage({
                            id: 'unoCore.serial.isSerialAvailable',
                            default: 'is the serial port having any data readable',
                            description: 'unoCore serial available data'
                        }),
                        blockType: BlockType.BOOLEAN,
                        disableMonitor: true,
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    // {
                    //     opcode: 'serialReadData',
                    //     text: formatMessage({
                    //         id: 'unoCore.serial.serialReadData',
                    //         default: 'serial read data',
                    //         description: 'unoCore serial read data'
                    //     }),
                    //     blockType: BlockType.REPORTER,
                    //     disableMonitor: true,
                    //     programMode: [ProgramModeType.UPLOAD]
                    // }
                    {
                        opcode: 'unoCoreSerialReadData',
                        text: formatMessage({
                            id: 'unoCore.serial.serialReadData',
                            default: 'serial read a [TYPE]',
                            description: 'unoCore serial read a int or float num'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            TYPE: {
                                type: ArgumentType.STRING,
                                menu: 'numtype',
                                defaultValue: 'int'
                            }
                        },
                        disableMonitor: true,
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                menus: {
                    baudrate: {
                        items: this.BAUDTATE_MENU
                    },
                    eol: {
                        items: this.EOL_MENU
                    },
                    print: {
                        items: this.PRINT_MENU
                    },
                    numtype: {
                        items: this.NUMTYPE_MENU
                    }
                }
            },
            {
                id: 'data',
                name: formatMessage({
                    id: 'arduinoUno.category.data',
                    default: 'Data',
                    description: 'The name of the unoCore device data category'
                }),
                color1: '#CF63CF',
                color2: '#C94FC9',
                color3: '#BD42BD',
                blocks: [
                    {
                        // opcode: 'dataConvert',
                        opcode: 'unoCoreStringConvert',
                        text: formatMessage({
                            id: 'unoCore.data.stringConvert',
                            default: 'convert string [DATA] to [TYPE]',
                            description: 'unoCore data convert'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.STRING,
                                defaultValue: '123'
                            },
                            TYPE: {
                                type: ArgumentType.STRING,
                                menu: 'dataType',
                                defaultValue: DataType.Integer
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'unoCoreDataConvertASCIICharacter',
                        text: formatMessage({
                            id: 'unoCore.data.dataConvertASCIICharacter',
                            default: 'convert [DATA] to ASCII character',
                            description: 'unoCore data convert to ASCII character'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'unoCoreDataConvertASCIINumber',
                        text: formatMessage({
                            id: 'unoCore.data.dataConvertASCIINumber',
                            default: 'convert [DATA] to ASCII nubmer',
                            description: 'unoCore data convert to ASCII nubmer'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.STRING,
                                defaultValue: 'a'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'unoCoreNumConvert',
                        text: formatMessage({
                            id: 'unoCore.data.numConvert',
                            default: 'convert number [DATA] to string',
                            description: 'unoCore data convert'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 132
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'unoCoreDataMap',
                        text: formatMessage({
                            id: 'unoCore.data.dataMap',
                            default: 'map [DATA] from ([ARG0], [ARG1]) to ([ARG2], [ARG3])',
                            description: 'unoCore data map'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            ARG0: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            ARG1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1023'
                            },
                            ARG2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            ARG3: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '255'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    '---',
                    {
                        opcode: 'unoCoreDataConstrain',
                        text: formatMessage({
                            id: 'unoCore.data.dataConstrain',
                            default: 'constrain [DATA] between ([ARG0], [ARG1])',
                            description: 'unoCore data constrain'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            ARG0: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            ARG1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '100'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    }
                    // // 保留几位小数
                    // {
                    //     opcode: 'numRetain',
                    //     text: formatMessage({
                    //         id: 'unoCore.data.numRetain',
                    //         default: '[DATA] retain [BIT] decimal',
                    //         description: 'unoCore data convert'
                    //     }),
                    //     blockType: BlockType.REPORTER,
                    //     arguments: {
                    //         DATA: {
                    //             type: ArgumentType.NUMBER,
                    //             defaultValue: 123.123
                    //         },
                    //         BIT: {
                    //             type: ArgumentType.BIT_NUMBER,
                    //             defaultValue: 0
                    //         }
                    //     },
                    //     programMode: [ProgramModeType.UPLOAD]
                    // }
                ],
                menus: {
                    dataType: {
                        items: this.DATA_TYPE_MENU_NOTSTR
                    }
                }
            }



            // {
            //     id: 'serial',
            //     name: formatMessage({
            //         id: 'arduinoUno.category.serial',
            //         default: 'Serial',
            //         description: 'The name of the arduino uno device serial category'
            //     }),
            //     color1: '#9966FF',
            //     color2: '#774DCB',
            //     color3: '#774DCB',

            //     blocks: [
            //         {
            //             opcode: 'unoStartSerialBegin',
            //             text: formatMessage({
            //                 id: 'arduinoUno.serial.serialBegin',
            //                 default: 'serial begin baudrate [VALUE]',
            //                 description: 'unoStart serial begin'
            //             }),
            //             blockType: BlockType.COMMAND,
            //             arguments: {
            //                 VALUE: {
            //                     type: ArgumentType.STRING,
            //                     menu: 'baudrate',
            //                     defaultValue: Buadrate.B9600
            //                 }
            //             },
            //             programMode: [ProgramModeType.UPLOAD]
            //         },
            //         {
            //             opcode: 'unoStartSerialPrint',
            //             text: formatMessage({
            //                 id: 'arduinoUno.serial.serialPrint',
            //                 default: 'serial print [VALUE] [EOL]',
            //                 description: 'unoStart serial print'
            //             }),
            //             blockType: BlockType.COMMAND,
            //             arguments: {
            //                 VALUE: {
            //                     type: ArgumentType.STRING,
            //                     defaultValue: 'Hello Scratch'
            //                 },
            //                 EOL: {
            //                     type: ArgumentType.STRING,
            //                     menu: 'eol',
            //                     defaultValue: Eol.Warp
            //                 }
            //             },
            //             programMode: [ProgramModeType.UPLOAD]
            //         },
            //         {
            //             opcode: 'unoStartSerialAvailable',
            //             text: formatMessage({
            //                 id: 'arduinoUno.serial.serialAvailable',
            //                 default: 'serial available data length',
            //                 description: 'unoStart serial available data length'
            //             }),
            //             blockType: BlockType.REPORTER,
            //             disableMonitor: true,
            //             programMode: [ProgramModeType.UPLOAD]
            //         },
            //         {
            //             opcode: 'unoStartSerialReadData',
            //             text: formatMessage({
            //                 id: 'arduinoUno.serial.serialReadData',
            //                 default: 'serial read data',
            //                 description: 'unoStart serial read data'
            //             }),
            //             blockType: BlockType.REPORTER,
            //             disableMonitor: true,
            //             programMode: [ProgramModeType.UPLOAD]
            //         }
            //     ],
            //     menus: {
            //         baudrate: {
            //             items: this.BAUDTATE_MENU
            //         },
            //         eol: {
            //             items: this.EOL_MENU
            //         }
            //     }
            // },
            // {
            //     id: 'data',
            //     name: formatMessage({
            //         id: 'arduinoUno.category.data',
            //         default: 'Data',
            //         description: 'The name of the arduino uno device data category'
            //     }),
            //     color1: '#CF63CF',
            //     color2: '#C94FC9',
            //     color3: '#BD42BD',
            //     blocks: [
            //         {
            //             opcode: 'unoStartDataMap',
            //             text: formatMessage({
            //                 id: 'arduinoUno.data.dataMap',
            //                 default: 'map [DATA] from ([ARG0], [ARG1]) to ([ARG2], [ARG3])',
            //                 description: 'unoStart data map'
            //             }),
            //             blockType: BlockType.REPORTER,
            //             arguments: {
            //                 DATA: {
            //                     type: ArgumentType.NUMBER,
            //                     defaultValue: '50'
            //                 },
            //                 ARG0: {
            //                     type: ArgumentType.NUMBER,
            //                     defaultValue: '1'
            //                 },
            //                 ARG1: {
            //                     type: ArgumentType.NUMBER,
            //                     defaultValue: '100'
            //                 },
            //                 ARG2: {
            //                     type: ArgumentType.NUMBER,
            //                     defaultValue: '1'
            //                 },
            //                 ARG3: {
            //                     type: ArgumentType.NUMBER,
            //                     defaultValue: '1000'
            //                 }
            //             },
            //             programMode: [ProgramModeType.UPLOAD]
            //         },
            //         '---',
            //         {
            //             opcode: 'unoStartDataConstrain',
            //             text: formatMessage({
            //                 id: 'arduinoUno.data.dataConstrain',
            //                 default: 'constrain [DATA] between ([ARG0], [ARG1])',
            //                 description: 'unoStart data constrain'
            //             }),
            //             blockType: BlockType.REPORTER,
            //             arguments: {
            //                 DATA: {
            //                     type: ArgumentType.NUMBER,
            //                     defaultValue: '50'
            //                 },
            //                 ARG0: {
            //                     type: ArgumentType.NUMBER,
            //                     defaultValue: '1'
            //                 },
            //                 ARG1: {
            //                     type: ArgumentType.NUMBER,
            //                     defaultValue: '100'
            //                 }
            //             },
            //             programMode: [ProgramModeType.UPLOAD]
            //         },
            //         {
            //             opcode: 'unoStartDataConvert',
            //             text: formatMessage({
            //                 id: 'arduinoUno.data.dataConvert',
            //                 default: 'convert [DATA] to [TYPE]',
            //                 description: 'unoStart data convert'
            //             }),
            //             blockType: BlockType.REPORTER,
            //             arguments: {
            //                 DATA: {
            //                     type: ArgumentType.STRING,
            //                     defaultValue: '123'
            //                 },
            //                 TYPE: {
            //                     type: ArgumentType.STRING,
            //                     menu: 'dataType',
            //                     defaultValue: DataType.Integer
            //                 }
            //             },
            //             programMode: [ProgramModeType.UPLOAD]
            //         },
            //         {
            //             opcode: 'unoStartDataConvertASCIICharacter',
            //             text: formatMessage({
            //                 id: 'arduinoUno.data.dataConvertASCIICharacter',
            //                 default: 'convert [DATA] to ASCII character',
            //                 description: 'unoStart data convert to ASCII character'
            //             }),
            //             blockType: BlockType.REPORTER,
            //             arguments: {
            //                 DATA: {
            //                     type: ArgumentType.NUMBER,
            //                     defaultValue: '97'
            //                 }
            //             },
            //             programMode: [ProgramModeType.UPLOAD]
            //         },
            //         {
            //             opcode: 'unoStartDataConvertASCIINumber',
            //             text: formatMessage({
            //                 id: 'arduinoUno.data.dataConvertASCIINumber',
            //                 default: 'convert [DATA] to ASCII nubmer',
            //                 description: 'unoStart data convert to ASCII nubmer'
            //             }),
            //             blockType: BlockType.REPORTER,
            //             arguments: {
            //                 DATA: {
            //                     type: ArgumentType.STRING,
            //                     defaultValue: 'a'
            //                 }
            //             },
            //             programMode: [ProgramModeType.UPLOAD]
            //         }
            //     ],
            //     menus: {
            //         dataType: {
            //             items: this.DATA_TYPE_MENU
            //         }
            //     }
            // }
        ];
    }

    /**
     * Set pin mode.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin mode is done.
     */
     setUnoStartPinMode (args) {
        this._peripheral.setUnoStartPinMode(args.PIN, args.MODE);
        return Promise.resolve();
    }

    /**
     * Set pin digital out level.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin digital out level is done.
     */
     setUnoStartDigitalOutput (args) {
        this._peripheral.setUnoStartDigitalOutput(args.PIN, args.LEVEL);
        return Promise.resolve();
    }

    /**
     * Set pin pwm out value.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin pwm out value is done.
     */
     setUnoStartPwmOutput (args) {
        this._peripheral.setUnoStartPwmOutput(args.PIN, args.OUT);
        return Promise.resolve();
    }

    /**
     * Read pin digital level.
     * @param {object} args - the block's arguments.
     * @return {boolean} - true if read high level, false if read low level.
     */
     readUnoStartDigitalPinNum (args) {
        return this._peripheral.readUnoStartDigitalPinNum(args.PIN);
    }

    /**
     * Read analog pin.
     * @param {object} args - the block's arguments.
     * @return {number} - analog value fo the pin.
     */
     readUnoStartAnalogPin (args) {
        return this._peripheral.readUnoStartAnalogPin(args.PIN);
    }

    /**
     * Set servo out put.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set servo out value is done.
     */
     setUnoStartServoOutput (args) {
        this._peripheral.setUnoStartServoOutput(args.PIN, args.OUT);
        return Promise.resolve();
    }
}

module.exports = OpenBlockUnoStartDevice;
