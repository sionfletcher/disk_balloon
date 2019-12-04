const SerialPort = require('serialport');
const disk = require('diskusage');
const os = require('os');
SerialPort.list().then(p => console.log(p));


// Change the path here to your volume path
let path = os.platform() === 'win32' ? 'E:' : '/USB_NAME';
// Change the port name here
let portName = 'COM1';



let port;

/**
 * Interval function
 */
function checkHDD() {

    /**
     * Use diskusage to check the port
     */
    disk.check(path, function (err, info) {
        
        if (!err) {
            console.log(info.available);
            console.log(info.free);
            console.log(info.total);

            const free = info.available / info.total;

            port.write(free.toString(), (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('success! ' + free);
                }
            })
        } else {
            console.log(err);
        }
    });
}

/**
 * Opening the port here
 */
port = new SerialPort(portName, {
    baudRate: 9600
}, (err) => {

    /**
     * Once it's opened, start the interval
     */
    setInterval(checkHDD, 5000);
    checkHDD();
})
