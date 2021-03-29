function btoo(size) {
    if (size > 1099511627776) {size = size/1099511627776;size = size.toFixed(2);size = size+"To"}
    else if (size > 1073741824) {size = size/1073741824;size = size.toFixed(2);size = size+"Go"}
    else if (size > 1048576) {size = size/1048576;size = size.toFixed(2);size = size+"Mo"}
    else if (size > 1024) {size = size/1024;size = size.toFixed(2);size = size+"Ko"}
    else {size = size+"o"}
    return size
}