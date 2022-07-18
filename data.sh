#!/bin/bash

temp=$(vcgencmd measure_temp | cut -f 2 -d = | tr -d \'C)
cpu=$[100-$(vmstat 1 2|tail -1|awk '{print $15}')]
ram=$(free | grep Mem | awk '{printf "%.1f",$3/$2 * 100.0}')

echo $temp\;$cpu\;$ram