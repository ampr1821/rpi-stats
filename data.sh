#!/bin/bash

temp=$(vcgencmd measure_temp | cut -f 2 -d = | tr -d \'C)
cpu=$(cat /proc/stat |grep cpu |head -1|awk '{print ($5*100)/($2+$3+$4+$5+$6+$7+$8+$9+$10)}'|awk '{printf "%.1f",100-$1}')
ram=$(free | grep Mem | awk '{printf "%.1f",$3/$2 * 100.0}')

echo $temp\;$cpu\;$ram