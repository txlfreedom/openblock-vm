const formatMessage = require('format-message');

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const ProgramModeType = require('../../extension-support/program-mode-type');

const ArduinoPeripheral = require('../arduinoCommon/arduino-peripheral');

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

const MotorNum = {
    // M1: 'Pins.D3,Pins.D5',
    // M2: 'Pins.D6,Pins.D9'
    M1: 'M1',
    M2: 'M2'
};

const TiclockwiseType = {
    Ticlockwise: 'anticlockwise',
    Anticlockwise: 'ticlockwise'
};

/**
 * Manage communication with a Arduino Uno peripheral over a OpenBlock Link client socket.
 */
class UnoCore extends ArduinoPeripheral{
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
class OpenBlockUnoCoreDevice {
    /**
     * @return {string} - the ID of this extension.
     */
    static get DEVICE_ID () {
        return 'unoCore';
    }

    get PINS_MENU () {
        return [
            {
                text: 'P1',
                value: Pins.A0
            },
            {
                text: 'P2',
                value: Pins.A1
            },
            {
                text: 'P3',
                value: Pins.A2
            },
            {
                text: 'P4',
                value: Pins.A3
            },
            {
                text: 'P5',
                value: Pins.D2
            },
            {
                text: 'P6',
                value: Pins.D4
            },
            {
                text: 'P7',
                value: Pins.D7
            },
            {
                text: 'P8',
                value: Pins.D8
            },
            {
                text: 'P9',
                value: Pins.A6
            },
            {
                text: 'P10',
                value: Pins.A7
            },
            {
                text: 'P11',
                value: Pins.D12
            },
            {
                text: 'P12',
                value: Pins.D13
            }
        ];
    }

    get MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'unoCore.modeMenu.input',
                    default: 'input',
                    description: 'label for input pin mode'
                }),
                value: Mode.Input
            },
            {
                text: formatMessage({
                    id: 'unoCore.modeMenu.output',
                    default: 'output',
                    description: 'label for output pin mode'
                }),
                value: Mode.Output
            },
            {
                text: formatMessage({
                    id: 'unoCore.modeMenu.inputPullup',
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
                text: 'P1',
                value: Pins.A0
            },
            {
                text: 'P2',
                value: Pins.A1
            },
            {
                text: 'P3',
                value: Pins.A2
            },
            {
                text: 'P4',
                value: Pins.A3
            },
            {
                text: 'P9',
                value: Pins.A6
            },
            {
                text: 'P10',
                value: Pins.A7
            }
        ];
    }

    get LEVEL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'unoCore.levelMenu.high',
                    default: 'high level',
                    description: 'label for high level'
                }),
                value: Level.High
            },
            {
                text: formatMessage({
                    id: 'unoCore.levelMenu.low',
                    default: 'low level',
                    description: 'label for low level'
                }),
                value: Level.Low
            }
        ];
    }

    get PWM_PINS_MENU () {
        return [
            {
                text: 'D3',
                value: Pins.D3
            },
            {
                text: 'D5',
                value: Pins.D5
            },
            {
                text: 'D6',
                value: Pins.D6
            },
            {
                text: 'D9',
                value: Pins.D9
            },
            {
                text: 'D10',
                value: Pins.D10
            },
            {
                text: 'D11',
                value: Pins.D11
            }
        ];
    }

    get PWM_INTERFACE_MENU () {
        return [
            {
                text: 'PWM1',
                value: Pins.D10
            },
            {
                text: 'PWM2',
                value: Pins.D11
            }
        ];
    }

    get INTERRUPT_PINS_MENU () {
        return [
            {
                text: 'P5',
                value: Pins.D2
            }
        ];
    }

    get MOTOR_CHOOSE_MENU (){
        return [
            {
                text: 'M1(D3,D5)',
                value: 'Pins.D3,Pins.D5'
            },
            {
                text: 'M2(D6,D9)',
                value: 'Pins.D6,Pins.D9'
            }
        ];
    }

    get MOTOR_CHOOSE_MENU2 (){
        return [
            {
                text: 'M1(D3,D5)',
                value: 'M1'
            },
            {
                text: 'M2(D6,D9)',
                value: 'M2'
            }
        ];
    }

    get CLOCKWISES_MENU (){
        return [
            {
                text: formatMessage({
                    id: 'unoCore.clockwiseMenu.clockwise',
                    default: 'clockwise',
                    description: 'label for clockwise mode'
                }),
                value: 'CLOCKWISE'
            },
            {
                text: formatMessage({
                    id: 'unoCore.clockwiseMenu.anticlockwise',
                    default: 'anticlockwise',
                    description: 'label for anticlockwise mode'
                }),
                value: 'ANTICLOCKWISE'
            }
        ];
    }

    get INTERRUP_MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'unoCore.InterrupModeMenu.risingEdge',
                    default: 'rising edge',
                    description: 'label for rising edge interrup'
                }),
                value: InterrupMode.Rising
            },
            {
                text: formatMessage({
                    id: 'unoCore.InterrupModeMenu.fallingEdge',
                    default: 'falling edge',
                    description: 'label for falling edge interrup'
                }),
                value: InterrupMode.Falling
            },
            {
                text: formatMessage({
                    id: 'unoCore.InterrupModeMenu.changeEdge',
                    default: 'change edge',
                    description: 'label for change edge interrup'
                }),
                value: InterrupMode.Change
            },
            {
                text: formatMessage({
                    id: 'unoCore.InterrupModeMenu.low',
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
                    id: 'unoCore.eolMenu.warp',
                    default: 'warp',
                    description: 'label for warp print'
                }),
                value: Eol.Warp
            },
            {
                text: formatMessage({
                    id: 'unoCore.eolMenu.noWarp',
                    default: 'no-warp',
                    description: 'label for no warp print'
                }),
                value: Eol.NoWarp
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
        this._peripheral = new UnoCore(this.runtime, OpenBlockUnoCoreDevice.DEVICE_ID, originalDeviceId);
    }

    /**
     * @returns {Array.<object>} metadata for this extension and its blocks.
     */
    getInfo () {
        return [
            {
                id: 'pin',
                name: formatMessage({
                    id: 'unoCore.category.pins',
                    default: 'Interface operation',
                    description: 'The name of the unoCore device pin category'
                }),
                color1: '#4C97FF',
                color2: '#3373CC',
                color3: '#3373CC',

                blocks: [
                    // ************************************
                    // 保留个别几个供模块使用
                    // {
                    //     opcode: 'setDigitalOutput',
                    //     arguments: {
                    //         PIN: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'pins',
                    //             defaultValue: Pins.A0
                    //         },
                    //         LEVEL: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'level',
                    //             defaultValue: Level.High
                    //         }
                    //     }
                    // },
                    // {
                    //     opcode: 'readDigitalPin',
                    //     arguments: {
                    //         PIN: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'pins',
                    //             defaultValue: Pins.A0
                    //         },
                    //         LEVEL: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'level',
                    //             defaultValue: Level.High
                    //         }
                    //     }
                    // },
                    // ************************************
                    {
                        opcode: 'setUnoCorePinMode',
                        text: formatMessage({
                            id: 'unoCore.pins.setPinMode',
                            default: 'set pin [PIN] mode [MODE]',
                            description: 'unoCore set pin mode'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.A0
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'mode',
                                defaultValue: Mode.Input
                            }
                        }
                    },
                    {
                        opcode: 'setUnoCoreDigitalOutput',
                        text: formatMessage({
                            id: 'unoCore.pins.setDigitalOutput',
                            default: 'set digital pin [PIN] out [LEVEL]',
                            description: 'unoCore set digital pin out'
                        }),
                        blockType: BlockType.COMMAND,
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
                        opcode: 'setUnoCoreInterfacePwmOutput',
                        // opcode: 'setPwmOutput',
                        text: formatMessage({
                            id: 'unoCore.pins.setInterfacePwmOutput',
                            default: 'set pwm pin [PIN] out [OUT]',
                            description: 'unoCore set pwm pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pwmInterfaces',
                                defaultValue: Pins.D10
                            },
                            OUT: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '255'
                            }
                        }
                    },
                    {
                        opcode: 'setUnoCorePwmOutput',
                        text: formatMessage({
                            id: 'unoCore.pins.setPwmOutput',
                            default: 'set pwm interface [PIN] out [OUT]',
                            description: 'unoCore set pwm interface out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pwmPins',
                                defaultValue: Pins.D10
                            },
                            OUT: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '255'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'readUnoCoreDigitalPin',
                        text: formatMessage({
                            id: 'unoCore.pins.readDigitalPin',
                            default: 'interface [PIN] is [LEVEL]',
                            description: 'unoCore read digital pin'
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
                        opcode: 'readUnoCoreDigitalPinNum',
                        text: formatMessage({
                            id: 'unoCore.pins.readDigitalPinNum',
                            default: 'read digital pin [PIN]',
                            description: 'unoCore read digital pin'
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
                        opcode: 'readUnoCoreAnalogPin',
                        text: formatMessage({
                            id: 'unoCore.pins.readAnalogPin',
                            default: 'read analog pin [PIN]',
                            description: 'unoCore read analog pin'
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
                    // // 舵机引脚
                    // {
                    //     opcode: 'setServoOutput',
                    //     text: formatMessage({
                    //         id: 'unoCore.pins.setServoOutput',
                    //         default: 'set servo pin [PIN] out [OUT]',
                    //         description: 'unoCore set servo pin out'
                    //     }),
                    //     blockType: BlockType.COMMAND,
                    //     arguments: {
                    //         PIN: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'pwmPins',
                    //             defaultValue: Pins.D3
                    //         },
                    //         OUT: {
                    //             type: ArgumentType.ANGLE,
                    //             defaultValue: '90'
                    //         }
                    //     }
                    // },
                    {
                        opcode: 'UnoCoreRun',
                        text: formatMessage({
                            id: 'unoCore.motor.run',
                            default: 'set motor [MOTOR] as [SPEED] speed [ROTATE]',
                            description: 'unoCore motor run'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MOTOR: {
                                // type: ArgumentType.STRING,
                                // menu: 'motors',
                                // defaultValue: MotorNum.M1
                                type: ArgumentType.STRING,
                                menu: 'motors',
                                defaultValue: MotorNum.M1
                            },
                            SPEED: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '255'
                            },
                            ROTATE: {
                                type: ArgumentType.STRING,
                                menu: 'clockwises',
                                defaultValue: TiclockwiseType.clockwise
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'UnoCoreBrake',
                        text: formatMessage({
                            id: 'unoCore.motor.brake',
                            default: 'set motor [MOTOR] brake',
                            description: 'unoCore motor brake'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MOTOR: {
                                type: ArgumentType.STRING,
                                menu: 'motors',
                                defaultValue: MotorNum.M1
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'UnoCoreStop',
                        text: formatMessage({
                            id: 'unoCore.motor.stop',
                            default: 'set motor [MOTOR] stop',
                            description: 'unoCore motor stop'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MOTOR: {
                                type: ArgumentType.STRING,
                                menu: 'motors',
                                defaultValue: MotorNum.M1
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    '---',
                    {
                        opcode: 'UnoCoreAttachInterrupt',
                        text: formatMessage({
                            id: 'unoCore.pins.attachInterrupt',
                            default: 'attach interrupt pin P5 mode [MODE] executes',
                            description: 'unoCore attach interrupt'
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
                        opcode: 'UnoCoreDetachInterrupt',
                        text: formatMessage({
                            id: 'unoCore.pins.detachInterrupt',
                            default: 'detach interrupt pin P5',
                            description: 'unoCore detach interrupt'
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
                    pwmInterfaces: {
                        items: this.PWM_INTERFACE_MENU
                    },
                    pwmPins: {
                        items: this.PWM_PINS_MENU
                    },
                    interruptPins: {
                        items: this.INTERRUPT_PINS_MENU
                    },
                    interruptMode: {
                        items: this.INTERRUP_MODE_MENU
                    },
                    motors: {
                        items: this.MOTOR_CHOOSE_MENU2
                    },
                    clockwises: {
                        items: this.CLOCKWISES_MENU
                    }
                }
            },
            {
                id: 'serial',
                name: formatMessage({
                    id: 'unoCore.category.serial',
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
                    id: 'unoCore.category.data',
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

            // add by txl in 2021.10.18
            // {
            //     id: 'motor',
            //     name: formatMessage({
            //         id: 'unoCore.category.motor',
            //         default: 'Motor',
            //         description: 'The name of the unoCore device motor category'
            //     }),
            //     color1: '#9966FF',
            //     color2: '#774DCB',
            //     color3: '#774DCB',
            //     blocks: [
            //         {
            //             opcode: 'run',
            //             text: formatMessage({
            //                 id: 'unoCore.motor.run',
            //                 default: 'set motor [MOTOR] as [SPEED] speed [ROTATE]',
            //                 description: 'unoCore motor run'
            //             }),
            //             blockType: BlockType.COMMAND,
            //             arguments: {
            //                 MOTOR: {
            //                     // type: ArgumentType.STRING,
            //                     // menu: 'motors',
            //                     // defaultValue: MotorNum.M1
            //                     type: ArgumentType.STRING,
            //                     menu: 'motors',
            //                     defaultValue: MotorNum.M1
            //                 },
            //                 SPEED: {
            //                     type: ArgumentType.UINT8_NUMBER,
            //                     defaultValue: '255'
            //                 },
            //                 ROTATE: {
            //                     type: ArgumentType.STRING,
            //                     menu: 'clockwises',
            //                     defaultValue: TiclockwiseType.clockwise
            //                 }
            //             },
            //             programMode: [ProgramModeType.UPLOAD]
            //         },
            //         {
            //             opcode: 'brake',
            //             text: formatMessage({
            //                 id: 'unoCore.motor.brake',
            //                 default: 'set motor [MOTOR] brake',
            //                 description: 'unoCore motor brake'
            //             }),
            //             blockType: BlockType.COMMAND,
            //             arguments: {
            //                 MOTOR: {
            //                     type: ArgumentType.STRING,
            //                     menu: 'motors',
            //                     defaultValue: MotorNum.M1
            //                 }
            //             },
            //             programMode: [ProgramModeType.UPLOAD]
            //         },
            //         {
            //             opcode: 'stop',
            //             text: formatMessage({
            //                 id: 'unoCore.motor.stop',
            //                 default: 'set motor [MOTOR] stop',
            //                 description: 'unoCore motor stop'
            //             }),
            //             blockType: BlockType.COMMAND,
            //             arguments: {
            //                 MOTOR: {
            //                     type: ArgumentType.STRING,
            //                     menu: 'motors',
            //                     defaultValue: MotorNum.M1
            //                 }
            //             },
            //             programMode: [ProgramModeType.UPLOAD]
            //         }
            //     ],
            //     menus: {
            //         motors: {
            //             items: this.MOTOR_CHOOSE_MENU2
            //         },
            //         clockwises: {
            //             items: this.CLOCKWISES_MENU
            //         }
            //     }
            // }
        ];
    }

    // /**
    //  * Set pin mode.
    //  * @param {object} args - the block's arguments.
    //  * @return {Promise} - a Promise that resolves after the set pin mode is done.
    //  */
    // setPinMode (args) {
    //     this._peripheral.setPinMode(args.PIN, args.MODE);
    //     return Promise.resolve();
    // }

    // /**
    //  * Set pin digital out level.
    //  * @param {object} args - the block's arguments.
    //  * @return {Promise} - a Promise that resolves after the set pin digital out level is done.
    //  */
    // setDigitalOutput (args) {
    //     this._peripheral.setDigitalOutput(args.PIN, args.LEVEL);
    //     return Promise.resolve();
    // }

    // /**
    //  * Set pin pwm out value.
    //  * @param {object} args - the block's arguments.
    //  * @return {Promise} - a Promise that resolves after the set pin pwm out value is done.
    //  */
    // setPwmOutput (args) {
    //     this._peripheral.setPwmOutput(args.PIN, args.OUT);
    //     return Promise.resolve();
    // }

    // setInterfacePwmOutput (args) {
    //     this._peripheral.setInterfacePwmOutput(args.PIN, args.OUT);
    //     return Promise.resolve();
    // }

    // /**
    //  * Read pin digital level.
    //  * @param {object} args - the block's arguments.
    //  * @return {boolean} - true if read high level, false if read low level.
    //  */
    // readDigitalPin (args) {
    //     return this._peripheral.readDigitalPin(args.PIN);
    // }
    // readDigitalPinNum (args) {
    //     return this._peripheral.readDigitalPinNum(args.PIN);
    // }
    // /**
    //  * Read analog pin.
    //  * @param {object} args - the block's arguments.
    //  * @return {number} - analog value fo the pin.
    //  */
    // readAnalogPin (args) {
    //     return this._peripheral.readAnalogPin(args.PIN);
    // }

    // /**
    //  * Set servo out put.
    //  * @param {object} args - the block's arguments.
    //  * @return {Promise} - a Promise that resolves after the set servo out value is done.
    //  */
    // setServoOutput (args) {
    //     this._peripheral.setServoOutput(args.PIN, args.OUT);
    //     return Promise.resolve();
    // }
}

module.exports = OpenBlockUnoCoreDevice;
